/*
 * @Author: 卢天宇
 * @Date: 2024-01-09 14:25:48
 * @Description: 模拟请求队列
 */
import React, { useState, useRef } from "react";
import { Button, Modal, Progress } from "@arco-design/web-react";

// * 模拟请求
function request(target: number) {
  return new Promise((res) => {
    console.log("正在执行", target);
    setTimeout(res, Math.random() * 2000 + 1000);
  });
}

enum status {
  ing = "ing",
  done = "done",
  error = "error",
}

interface loopResProps {
  status: status;
  current?: number;
  total?: number;
}

function queeTask({
  data,
  abortRef,
}: {
  data: number[];
  abortRef: { abort: boolean };
}) {
  const controller = new AbortController();
  let idx = 0;
  const limit = data.length;
  console.log(idx, limit);
  return async function loop(
    res: (res: loopResProps) => void,
    rej: (rej: { status: string }) => void
  ) {
    console.log("loop", abortRef);
    if (abortRef.abort) {
      // * 中断
      controller.abort();
      rej({ status: status.error });
      return;
    }
    if (idx < limit) {
      const target = data[idx];
      res({ status: status.ing, current: idx, total: limit });
      await request(target);
      idx++;
      loop(res, rej);
    } else {
      // * 已完成
      res({ status: status.done, current: idx, total: limit });
    }
  };
}

export default function QueeTask() {
  const [showModal, setShowModal] = useState(false); // * 显示弹窗
  const [progress, setProgress] = useState<number | string>(0); // * 设置进度
  // * 用来控制是否中断
  const isController = useRef({ abort: false });
  const [data, setData] = useState<number[]>();
  console.log(data);

  return (
    <div className="p-10 mt-2">
      <h1 className="text-center">请求的任务队列模拟</h1>
      <Button
        type="primary"
        onClick={() => {
          const data = new Array(10)
            .fill(0)
            .map((item) =>
              Math.floor(Math.random() * 400 + Math.random() * 400)
            );
          setData(data);

          setShowModal(true);
          queeTask({ data: data, abortRef: isController.current })(
            (res) => {
              const { status, current, total } = res;
              console.log("调用中", status);
              const percent = Math.floor((current! / total!) * 100).toFixed(2);
              setProgress(percent);
            },
            (rej) => {
              console.log("rej", rej);
            }
          );
        }}
      >
        请求 20 条
      </Button>

      <Modal visible={showModal} title={null} footer={null} closeIcon={null}>
        <div className="flex items-center justify-center flex-col">
          <Progress type="circle" percent={progress as number} size="large" />
          <p className="text-center my-10">任务执行中</p>
          <Button
            type="primary"
            status="danger"
            onClick={() => {
              isController.current.abort = true;
              setShowModal(false);
            }}
          >
            取消
          </Button>
        </div>
      </Modal>
    </div>
  );
}

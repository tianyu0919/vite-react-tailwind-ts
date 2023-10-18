/*
 * @Author: 卢天宇
 * @Date: 2023-09-21 15:26:38
 * @Description: 
 */
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button, Space } from '@arco-design/web-react';


function useIntervalHook(initialState: number = 0, step: number = 1, maxNum: number = 10): [number, () => void, () => void] {
  const [num, setNum] = useState(initialState);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  function intervalStart() {
    console.log(timerRef.current);
    if (timerRef.current !== null) return;
    const timer = setInterval(() => {
      setNum((num) => {
        if (num + step > maxNum) {
          if (timerRef.current !== null)
            clearInterval(timerRef.current);
          return 0;
        }
        return num + step;
      });
    }, 1000)

    timerRef.current = timer;
  }

  function intervalPause() {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    }
  }, [])

  return [num, intervalStart, intervalPause];
}

export default function DewuCode() {
  // const [num, setNum] = useState<number>(0);
  const [num, intervalStart, intervalPause] = useIntervalHook(0, 2, 20);
  const [num1, intervalStart1, intervalPause1] = useIntervalHook(0, 1, 10);

  return (
    <>
      <div>题目描述：</div>
      <ul>
        <li>有一个num,点击开始,每过1s,num + 1</li>
        <li>在 num 大于 20时候,num = 0并且计时关闭</li>
        <li>点击暂停,暂停计时,点击开始继续开始</li>
      </ul>
      <span>当前的num是：{num}</span>
      <div>
        <Space>
          <Button type="primary" onClick={intervalStart}>开始</Button>
          <Button type="primary" onClick={intervalPause}>暂停</Button>
        </Space>
      </div>
      <span>当前的num1是：{num1}</span>
      <div>
        <Space>
          <Button type="primary" onClick={intervalStart1}>开始</Button>
          <Button type="primary" onClick={intervalPause1}>暂停</Button>
        </Space>
      </div>
    </>
  )
}

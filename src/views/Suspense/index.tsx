/*
 * @Author: 卢天宇
 * @Date: 2023-12-05 22:38:48
 * @Description:
 */
import React, { Suspense, useState, useEffect } from "react";

function LazyChildren() {
  console.log("xxx");
  // let status = "loading";
  const [status, setStatus] = useState("loading");
  const [result, setResult] = useState<any>(null);
  let suspender = null;

  useEffect(() => {
    suspender = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ default: <div>'我是lazyChildren'</div> });
      }, 5000);
    });

    suspender.then(
      (module) => {
        setStatus("success");
        setResult(module.default);
      },
      (error) => {
        setStatus("error");
        setResult(error);
      }
    );
  }, []);
  return {
    read() {
      if (status === "loading") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result.module;
      }
    },
  };
}

function LazyChildren1() {
  throw new Promise((resolve) => {
    setTimeout(() => {
      resolve({ default: <div>'我是lazyChildren'</div> });
    }, 5000);
  });
}

export default function SuspenseDemo() {
  return (
    <div className="mt-4 p-4 border rounded-md border-blue-200">
      <h1>Suspense学习</h1>

      <Suspense fallback={<div>loading...</div>}>
        <LazyChildren1 />
      </Suspense>
    </div>
  );
}

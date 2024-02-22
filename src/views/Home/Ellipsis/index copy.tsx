/*
 * @Author: 卢天宇
 * @Date: 2023-12-29 23:49:10
 * @Description: 换行显示组件
 */
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import "./index.less";
import classnames from "classnames";

interface Props {
  line?: number;
  children: React.ReactNode;
}

export default function Ellipsis({ line = 2, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isEllipsis, setEllipsis] = useState(false);

  function isScroll(el: HTMLDivElement) {
    const { offsetHeight, scrollHeight } = el;
    console.log(offsetHeight, scrollHeight);
    return scrollHeight > offsetHeight;
  }

  useLayoutEffect(() => {
    const { current } = ref;
    if (current) {
      if (isScroll(current)) {
        console.log(`${children}大雨了`)
        setEllipsis(true);
      }
    }
  }, []);

  return (
    <div
      ref={ref}
      className={classnames(`ellipsisLn-${line}`, {
        isEllipsis: isEllipsis,
      })}
      // className="container"
    >
      {/* <div className="text">{children}</div> */}
      {children}
      {isEllipsis && (
        <span className="text-cyan-400 float-left absolute left-0">更多</span>
      )}
    </div>
  );
}

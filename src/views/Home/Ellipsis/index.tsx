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
  style?: React.CSSProperties;
}

export default function Ellipsis({ line = 2, children, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isEllipsis, setEllipsis] = useState(false);

  function isScroll(el: HTMLDivElement) {
    const { offsetHeight, scrollHeight } = el;
    return scrollHeight > offsetHeight;
  }

  function getLineHeight(el: HTMLDivElement) {
    const { lineHeight } = getComputedStyle(el);
    const multiple = (line - 1) * parseInt(lineHeight);
    el.style.setProperty("--h", `${multiple}px`);
    el.style.setProperty("--t", `-${multiple}px`);
  }

  useLayoutEffect(() => {
    const { current } = ref;
    if (current) {
      if (isScroll(current)) {
        setEllipsis(true);
        getLineHeight(current);
      }
    }
  }, []);

  // useEffect(() => {
  //   let observer: MutationObserver;
  //   const { current } = ref;
  //   if (current) {
  //     const callback = (
  //       mutationsList: MutationRecord[],
  //       observer: MutationObserver
  //     ) => {
  //       for (const mutation of mutationsList) {
  //         console.log(mutation);
  //         // if (mutation.type === "childList") {
  //         if (isScroll(current)) {
  //           setEllipsis(true);
  //           getLineHeight(current);
  //         } else {
  //           setEllipsis(false);
  //         }
  //         // }
  //       }
  //     };

  //     observer = new MutationObserver(callback);
  //     observer.observe(current, {
  //       attributes: true,
  //       childList: true,
  //     });
  //   }
  //   return () => {
  //     if (observer) {
  //       observer.disconnect();
  //     }
  //   };
  // }, [ref.current]);

  return (
    <div
      style={style}
      ref={ref}
      className={classnames(`ellipsisLn-${line}`, {
        isEllipsis: isEllipsis,
      })}
    >
      {isEllipsis && <span className="text-cyan-400 float-right">更多</span>}
      <div className={classnames("childContent")}>{children}</div>
    </div>
  );
}

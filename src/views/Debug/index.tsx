import React, { useRef, useEffect, useState } from "react";
import { Popover, Tooltip, ResizeBox } from "@arco-design/web-react";
import "./index.css";
import subject from "./subject";

function isElementClipped(element: Element) {
  const computedStyle = window.getComputedStyle(element);
  return (
    computedStyle.overflow === "hidden" ||
    computedStyle.overflowX === "hidden" ||
    computedStyle.overflowY === "hidden" ||
    computedStyle.overflow === "scroll" ||
    computedStyle.overflowX === "scroll" ||
    computedStyle.overflowY === "scroll" ||
    computedStyle.overflow === "auto" ||
    computedStyle.overflowX === "auto" ||
    computedStyle.overflowY === "auto"
  );
}

function checkEllipsisStyles(element: HTMLElement) {
  const isClipped = isElementClipped(element);
  return (
    isClipped &&
    (element.offsetHeight < element.scrollHeight ||
      element.offsetWidth < element.scrollWidth)
  );
}

export default function Debug() {
  const domRef = useRef<HTMLElement | HTMLDivElement | undefined>();
  const showRef = useRef<HTMLElement | HTMLDivElement | undefined>();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  useEffect(() => {
    const showNode = showRef.current;
    const domNode = domRef.current;
    if (!subject.callback) {
      subject.callback = (dom) => {
        const showTips = checkEllipsisStyles(dom);
        console.log(showTips);
        setIsEllipsisActive(showTips);
        dom.style.transition = "all 0.3s";
        dom.style.background = "red";
        setTimeout(() => {
          dom.style.transition = "none";
          dom.style.background = "";
        }, 300);
      };
    }

    if (domNode && domNode instanceof HTMLElement) {
      subject.subscribe(domNode);
    }
    if (showNode && showNode instanceof HTMLElement) {
      subject.subscribe(showNode);
    }
    return () => {
      console.log("移除观察者咯");
      console.log(domNode, showNode);
      if (showNode) {
        subject.unsubscribe(showNode);
      }
      if (domNode) {
        subject.unsubscribe(domNode);
      }
      console.log(subject);
    };
  }, [showRef.current, domRef.current]); // Re-run if

  return (
    <div
      style={{
        margin: "auto",
        width: "300px",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <ResizeBox
        directions={["right"]}
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {isEllipsisActive ? (
          <Popover content="哈哈哈哈哈哈啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈">
            <div className="box" ref={showRef}>
              哈哈哈哈哈哈啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈
            </div>
          </Popover>
        ) : (
          <div className="box" ref={domRef}>
            哈哈哈哈哈哈啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈
          </div>
        )}
      </ResizeBox>
    </div>
  );
}

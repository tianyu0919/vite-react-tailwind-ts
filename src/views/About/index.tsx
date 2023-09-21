/*
 * @Author: 卢天宇
 * @Date: 2023-09-11 21:50:02
 * @Description: 
 */
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap';


export default function About() {
  const divRef = useRef<HTMLDivElement>(null);

  function numsAnimation() {
    gsap.to(divRef.current, {
      duration: 2,
      innerHTML: 100,
      roundProps: 'innerHTML', // 将内部值四舍五入为整数
    });
  }

  useEffect(() => {
    numsAnimation();
  }, [])

  return (
    <>
      <div>About</div>
      <div ref={divRef}>0</div>
    </>
  )
}

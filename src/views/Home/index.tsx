/*
 * @Author: 卢天宇
 * @Date: 2023-08-28 13:31:18
 * @Description: 
 */
import { useId, useState, useLayoutEffect, useEffect, useCallback, useMemo } from 'react'
import { Button, Space } from '@arco-design/web-react';
import { Outlet, useNavigate } from 'react-router-dom';
import store from '@/store';
import { increment, decrement, incrementByAmount } from '@/store/modules/counter';
import Children1 from './views/Children1';
import Children2 from './views/Children2';
import Children3 from './views/Children3';
import threeInit from './CityBg/index.ts';

import DewuCode from './dewuCode/index.tsx';

import CounterContext, { defaultValue } from "./context";
import { strLowerCaseToUpperCase } from '@/utils';

function App() {
  console.log('App rerender');
  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem('darkMode') === 'true' ? true : false);

  const [contextValue, setContextValue] = useState(defaultValue);

  const setNumCallback = useCallback(() => {
    console.log(contextValue);
    setContextValue({ num: contextValue.num - 1 });
  }, [contextValue]);

  const memoContextValue = useMemo(() => {
    return contextValue.num;
  }, [darkMode])

  /**
   * 切换主题回调
   */
  function toggleTheme() {
    setDarkMode((darkMode) => !darkMode);
    localStorage.setItem('darkMode', !darkMode ? 'true' : 'false');
  }

  useEffect(() => {
    // threeInit();
    store.subscribe(() => {
      console.log('Counter 回调');
      setCount(store.getState().counter.value)
    })
  }, [])

  /**
   * 切换主题时的钩子
   */
  useEffect(() => {
    console.log('useEffect rerender');
    const html = document.querySelector('html');
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      html?.classList.add('dark');
    } else {
      html?.classList.remove('dark');
    }
    // html?.classList.toggle('dark');
  }, [darkMode])

  useLayoutEffect(() => {
    console.log('useLayoutEffect rerender');
  }, [darkMode]);

  return (
    <>
      {/* 头部 */}
      <div className="border-b border-slate-900/10 dark:border-slate-50/[0.06] flex items-center justify-between bg-white dark:bg-slate-800 px-4 py-4 ring-1 ring-slate-900/5 shadow-xl relative z-10">
        <div
          className="text-lg font-medium text-black dark:text-white cursor-pointer"
          onClick={() => {
            navigate('/')
          }}>归宿网</div>
        <div className='cursor-pointer select-none' onClick={toggleTheme}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2 block dark:hidden"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" className="fill-sky-400/20 stroke-sky-500"></path><path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" className="stroke-sky-500"></path></svg>
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mr-2 hidden dark:block"><path fillRule="evenodd" clipRule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" className="fill-sky-400/20"></path><path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" className="fill-sky-500"></path><path fillRule="evenodd" clipRule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z" className="fill-sky-500"></path></svg>
        </div>
      </div>
      {/* 内容 */}
      <div className="pt-8 px-4 h-[calc(100vh-61px)] dark:bg-slate-800 dark:text-white">
        <div className="card">
          <Space>
            <Button onClick={() => {
              store.dispatch(increment(1));
              // store.dispatch(incrementByAmount(10));
              return count + 1
            }}>
              count is {count}
            </Button>
          </Space>
        </div>
        <div className='mt-8 flex gap-1'>
          <CounterContext.Provider value={contextValue}>
            <Children1 count={count} setNum={setNumCallback} />
            <Children2 count={count} contextNum={memoContextValue} />
            <Children3 />
          </CounterContext.Provider>
        </div>
        <div className="mt-10">
          <DewuCode />
        </div>

        <Button onClick={() => {
          const str = strLowerCaseToUpperCase('hello world');
          console.log(str);
        }}>转换单词首字母大写</Button>
        <Outlet />
      </div>
    </>
  )
}

export default App

/*
 * @Author: 卢天宇
 * @Date: 2023-09-12 07:31:47
 * @Description: 
 */
import React, { useEffect, useState, memo } from 'react';
import { Button, Space } from '@arco-design/web-react';
import store from '@/store';
import { increment, decrement } from '@/store/modules/actionCounter'

function Children3() {
  console.log('Children3 rereload');

  const [actionCounter, setActionCounter] = useState<number>(0)

  useEffect(() => {
    store.subscribe(() => {
      console.log('actionCounter 回调')
      setActionCounter(store.getState().actionCounter);
    })
  }, [])

  return (
    <div className='p-2 bg-slate-500 rounded-md flex-grow'>
      <div>
        Children3
      </div>
      <div className="text-white">
        actionCounter {actionCounter}
      </div>
      <Space>
        <Button
          onClick={() => {
            store.dispatch(increment(1));
          }}>
          增加
        </Button>
        <Button
          onClick={() => {
            store.dispatch(decrement(2));
          }}>
          减少
        </Button>
      </Space>
    </div>
  )
}

export default memo(Children3);

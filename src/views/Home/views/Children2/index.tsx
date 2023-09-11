import React, { useContext, memo } from 'react'
import { Button, Space } from '@arco-design/web-react';
import store from '@/store';
import { increment, decrement, incrementByAmount } from '@/store/modules/counter';


interface Children2Props {
  count: number;
  contextNum: number;
}

function Children2({ count, contextNum }: Children2Props) {
  console.log('children2 render');

  return (
    <div className="p-2 bg-slate-500 rounded-md flex-grow">
      Children2
      <div className='text-white'>StoreCount: {count}</div>
      <div className='text-white'>ContextNum: {contextNum}</div>
      <Space>
        <Button
          onClick={() => {
            store.dispatch(increment());
          }}>
          增加Store
        </Button>
      </Space>
    </div>
  )
}

export default memo(Children2)
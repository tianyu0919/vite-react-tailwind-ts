/*
 * @Author: 卢天宇
 * @Date: 2023-09-11 22:08:56
 * @Description: 
 */
import React, { memo, useContext, useEffect } from 'react'
import { Button, Space } from '@arco-design/web-react';
import store from '@/store'
import { increment, decrement, incrementByAmount } from '@/store/modules/counter';
import Context from '../../context';

interface Children1Props {
  count: number;
  setNum: () => void
}

function Children({ count, setNum }: Children1Props): React.ReactElement {
  const context = useContext(Context);
  console.log('children1 render');

  return (
    <div className="p-2 bg-slate-500 rounded-md flex-grow">
      Children1
      <div className='text-white'>StoreCount: {count}</div>
      <div className='text-white'>ContextNum: {context.num}</div>
      <Space>
        <Button
          onClick={() => {
            store.dispatch(decrement());
          }}>
          减少Store
        </Button>

        <Button
          onClick={() => {
            setNum();
          }}>
          减少Context
        </Button>
      </Space>
    </div>
  )
}

export default memo(Children);

// export default Children;

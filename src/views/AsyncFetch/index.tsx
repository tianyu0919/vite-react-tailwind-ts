/*
 * @Author: 卢天宇
 * @Date: 2023-09-12 06:54:48
 * @Description: 
 */
import React from 'react'
import { Button, Space } from '@arco-design/web-react';
import store from '@/store';
import { fetchData } from '@/store/modules/users';

export default function AsyncFetch() {
  return (
    <div>AsyncFetch
      <Button onClick={() => {
        store.dispatch(fetchData());
      }}>请求</Button>
    </div>
  )
}

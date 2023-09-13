/*
 * @Author: 卢天宇
 * @Date: 2023-09-12 06:54:48
 * @Description: 
 */
import React from 'react'
import { Button, Space } from '@arco-design/web-react';
import store from '@/store';
import { fetchData } from '@/store/modules/users';
import Axios, { AxiosInstance } from 'axios';

const axios: AxiosInstance = Axios.create({
  baseURL: 'https://randomuser.me'
})

export default function AsyncFetch() {

  function axiosGetHandler() {
    axios.get('/api').then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
  function axiosPostHandler() {
    axios.post('http://localhost:3000/api').then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div>AsyncFetch
      <div>
        <Space>
          <Button onClick={() => {
            store.dispatch(fetchData());
          }}>请求</Button>
          <Button onClick={axiosGetHandler}>请求Axios---Get</Button>
          <Button onClick={axiosPostHandler}>请求Axios---Post</Button>
        </Space>
      </div>
    </div>
  )
}

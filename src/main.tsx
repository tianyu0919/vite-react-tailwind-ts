/*
 * @Author: 卢天宇
 * @Date: 2023-08-28 13:31:18
 * @Description: 
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/Home/index.tsx'
import About from './views/About/index.tsx'
import Shop from './views/Shop/index.tsx'
import RecordVideo from './views/RecordVideo/index.tsx'
import './tailwind.css'
import "@arco-design/web-react/dist/css/arco.css";

import { HashRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter basename='/'>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="About" element={<About />} />
        <Route path="Shop" element={<Shop />} />
        <Route path="RecordVideo" element={<RecordVideo />} />
      </Route >
    </Routes>
  </HashRouter>
)

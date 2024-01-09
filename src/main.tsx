/*
 * @Author: 卢天宇
 * @Date: 2023-08-28 13:31:18
 * @Description: 
 */
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './views/Home/index.tsx'
// import About from './views/About/index.tsx'
// import Shop from './views/Shop/index.tsx'
// import RecordVideo from './views/RecordVideo/index.tsx'
// import AsyncFetch from './views/AsyncFetch';
import './tailwind.css'
import "@arco-design/web-react/dist/css/arco.css";


const App = lazy(() => import('./views/Home/index.tsx'));
const About = lazy(() => import('./views/About/index.tsx'));
const Shop = lazy(() => import('./views/Shop/index.tsx'));
const RecordVideo = lazy(() => import('./views/RecordVideo/index.tsx'));
const AsyncFetch = lazy(() => import('./views/AsyncFetch'));
const SuspenseDemo = lazy(() => import("./views/Suspense"));
const Debug = lazy(() => import("./views/Debug"));
const QueeTask = lazy(() => import("./views/QueeTask"));

import { HashRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter basename="/">
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="About" element={<About />} />
          <Route path="Shop" element={<Shop />} />
          <Route path="RecordVideo" element={<RecordVideo />} />
          <Route path="AsyncFetch" element={<AsyncFetch />} />
          <Route path="Suspense" element={<SuspenseDemo />} />
          <Route path="debug" element={<Debug />} />
          <Route path="queetask" element={<QueeTask />} />
        </Route>
      </Routes>
    </Suspense>
  </HashRouter>
);

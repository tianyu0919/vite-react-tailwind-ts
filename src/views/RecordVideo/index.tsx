import React, { useState, useEffect, useRef } from 'react'
import { Button, Select } from '@arco-design/web-react';
const { Option } = Select;

export default function RecordVideo() {

  const videoRef = useRef<HTMLVideoElement>(null);

  const [audioInputArr, setAudioInputArr] = useState<MediaDeviceInfo[]>([]);
  const [videoInputArr, setvideoInputArr] = useState<MediaDeviceInfo[]>([]);
  const [currentAudioInput, setCurrentAudioInput] = useState<MediaDeviceInfo>();
  const [currentVideoInput, setCurrentVideoInput] = useState<MediaDeviceInfo>();

  /**
   * 分享屏幕
   */
  async function ShareScreen() {
    await navigator.mediaDevices.getDisplayMedia({});
  }

  /**
   * 选择不同设备的时候，重新设置localStorage的值，并重新加载页面。
   * @param srouce 设备列表
   * @param DeviceId 选择的设备DeviceId
   * @param type 需要修改localStorage的值
   */
  function changeDeviceAndReload(srouce: MediaDeviceInfo[], DeviceId: string, type: string) {
    const selectValue = srouce.filter(device => device.deviceId === DeviceId)[0];
    setCurrentVideoInput(selectValue);
    localStorage.setItem(type, selectValue?.deviceId);
    window.location.reload();
  }

  /**
   * 获取可以使用的视频、音频的设备
   * @returns 
   */
  function getDevicesList(): Promise<{ tempAudioInputArr: MediaDeviceInfo[], tempVideoInputArr: MediaDeviceInfo[] }> {
    return new Promise((resolve) => {
      // * 音频、视频的输入
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          // 处理设备列表
          const tempAudioInputArr: MediaDeviceInfo[] = [];
          const tempVideoInputArr: MediaDeviceInfo[] = [];
          // 处理设备列表
          devices.forEach(device => {
            const { kind } = device;
            if (kind === "audioinput") {
              tempAudioInputArr.push(device);
            } else if (kind === 'videoinput') {
              tempVideoInputArr.push(device);
            }
          })
          setAudioInputArr(tempAudioInputArr);
          setvideoInputArr(tempVideoInputArr);
          resolve({ tempAudioInputArr, tempVideoInputArr })
        })
        .catch(error => {
          // 处理错误
          console.log(error);
        });
    })
  }

  /**
   * 获取音频、视频的权限。
   */
  async function getNavigator(options: MediaStreamConstraints) {
    const { tempAudioInputArr, tempVideoInputArr } = await getDevicesList();

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // 获取摄像头
      const stream = await navigator.mediaDevices.getUserMedia(options)
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        }); // 总是在最后检查错误
      const currentAudio = tempAudioInputArr.filter(device => stream?.getAudioTracks()[0]?.label === device.label)[0];
      const currentVideo = tempVideoInputArr.filter(device => stream?.getVideoTracks()[0]?.label === device.label)[0];
      setCurrentAudioInput(currentAudio);
      setCurrentVideoInput(currentVideo);

      const video = videoRef.current;
      if (video) {
        video.srcObject = stream as MediaProvider;
        video.oncanplay = function () {
          video.play();
        }
      }
    } else {
      console.error('浏览器不支持 getUserMedia.');
    }
  }

  useEffect(() => {
    const options = {
      audio: (localStorage.getItem('audioInputId')) as MediaTrackConstraints || true,
      video: (localStorage.getItem('videoInputId')) as MediaTrackConstraints || true
    }
    if (localStorage.getItem('audioInputId')) {
      options.audio = {
        deviceId: localStorage.getItem('audioInputId') as ConstrainDOMString
      }
    }
    if (localStorage.getItem('videoInputId')) {
      options.video = {
        deviceId: localStorage.getItem('videoInputId') as ConstrainDOMString
      }
    }
    getNavigator(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      RecordVideo
      <Button type="primary" onClick={ShareScreen}>屏幕共享</Button>

      <div className='my-10'>
        <div className='flex gap-5'>
          <div className="flex items-center">
            <label className='inline-block w-16'>音频：</label>
            <Select
              onChange={(value) => {
                changeDeviceAndReload(audioInputArr, value, 'audioInputId');
              }}
              value={currentAudioInput?.deviceId}
              style={{ width: '250px' }}>{
                audioInputArr.map((item) => <Option key={item.deviceId} value={item.deviceId}>{item.label}</Option>)
              }
            </Select>
          </div>
          <div className='flex items-center'>
            <label className="inline-block w-16">视频：</label>
            <Select
              onChange={(value) => {
                changeDeviceAndReload(videoInputArr, value, 'videoInputId');
              }}
              value={currentVideoInput?.deviceId}
              style={{ width: '250px' }}>{
                videoInputArr.map((item) => <Option key={item.deviceId} value={item.deviceId}>{item.label}</Option>)
              }
            </Select>
          </div>
        </div>
        <div className='mt-4'>
          <video ref={videoRef}></video>
        </div>
      </div>
    </div>
  )
}

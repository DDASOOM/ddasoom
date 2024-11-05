'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setAuthData } from '../store/authSlice';

/** 토큰 정보(토큰, 유저 이름, 유저id) */
const useAuth = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<Token | null>(null);
  const [userName, setUserName] = useState<Name | null>(null);
  const [userId, setUserId] = useState<UserId | null>(null);

  const sendMessageToApp = () => {
    const message = 'GETTOKEN';
    window.ReactNativeWebView?.postMessage(message);
  };

  useEffect(() => {
    // 토큰이 없을 때만 앱에 메시지 전송
    if (!token || !userName || !userId) {
      sendMessageToApp();
    }

    const handleMessage = (event: MessageEvent) => {
      try {
        const { title, content } = JSON.parse(event.data);
        if (title === 'TOKEN') {
          console.log('앱에서 받아온 토큰 정보들 저장 완료');
          setUserName(content.userName);
          setToken(content.token);
          setUserId(content.userId);
          // Redux에 토큰과 사용자 정보 저장
          dispatch(setAuthData({ token: content.token, userName: content.userName, userId: content.userId }));
        }
      } catch (e) {
        console.error('Failed to handle message:', e);
      }
    };

    window.addEventListener('message', handleMessage);

    // 클린업 함수
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch, token, userName, userId]);

  return { token, userName, userId };
};

export default useAuth;

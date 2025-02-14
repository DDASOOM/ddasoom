'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import background from '@/components/BackGround/Background.module.css';
import Header from '@/components/Common/Header';
import BreathSelector from '@/components/Training/Breath/BreathSelector';
import SettingButton from '@/components/Training/Breath/SettingButton';
import SettingContent from '@/components/Training/Breath/SettingContent';
import SettingModal from '@/components/Training/Breath/SettingModal';
import Backcloud from '@/svgs/backcloud.svg';
const pageVariants = {
  initial: { x: '100%', opacity: 0 }, // 화면 오른쪽에서 시작
  animate: { x: 0, opacity: 1 }, // 화면 중앙으로 이동
  exit: { x: '-100%', opacity: 0 }, // 화면 왼쪽으로 사라짐
};
export default function BreathTrainingPage() {
  const [selectedBreathType, setSelectedBreathType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!selectedBreathType) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          title: 'BREATH',
          content: null,
        }),
      );
    }
  }, []);

  const handleSaveSelection = (breathType: string) => {
    setSelectedBreathType(breathType);
    setIsModalOpen(false);

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'BREATH',
        content: breathType,
      }),
    );
  };

  return (
    <motion.section
      className={`${background.background4} absolute inset-0 flex justify-center overflow-hidden text-white`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.6, ease: 'easeInOut' }}>
      <div className="absolute top-9 left-2 w-full">
        <Header label="" />
      </div>
      <div className="absolute bottom-0 w-full">
        <Backcloud />
      </div>
      <div className="absolute top-5 right-6">
        <SettingButton onClick={() => setIsModalOpen(true)} />
      </div>
      <main>
        <h1 className="text-4xl font-hakgyoansimR mt-24 mb-5">
          따솜이와 함께 <br />
          호흡에 집중해볼까요?
        </h1>
        <div className="flex items-center justify-center">
          <BreathSelector selectedBreathType={selectedBreathType} />
        </div>
        {isModalOpen && (
          <SettingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            ContentComponent={() => (
              <SettingContent
                selectedBreathType={selectedBreathType}
                onSave={handleSaveSelection}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          />
        )}
      </main>
    </motion.section>
  );
}

'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import queryKeys from '@/api/querykeys';
import { getDailyData } from '@/api/recordAPI';
import ErrorModal from '@/components/Common/ErrorModal';
import CustomCalendar from '@/components/Record/Calendar/CustomCalendar';
import { DailyData, DailyRecord } from '@/types/http/response';

import PanicRecord from './PanicRecord';
import TodayRecord from './TodayRecord';

interface CalendarProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Calendar({ searchParams }: CalendarProps) {
  const queryClient = useQueryClient();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errorContext, setErrorContext] = useState<string>('');

  // 초기 날짜 설정
  useEffect(() => {
    const year = searchParams.year;
    const month = searchParams.month;
    const day = searchParams.day;
    const initialDate = year && month && day ? new Date(Number(year), Number(month) - 1, Number(day)) : new Date();
    setSelectedDate(initialDate);
  }, [searchParams]);

  // 선택된 날짜에 대한 year, month, day 정보 생성
  const year = selectedDate ? selectedDate.getFullYear().toString() : '';
  const month = selectedDate ? (selectedDate.getMonth() + 1).toString().padStart(2, '0') : '';
  const day = selectedDate ? selectedDate.getDate().toString().padStart(2, '0') : '';

  const {
    data: dailyData,
    isError,
    error,
    refetch,
  } = useQuery<DailyData>({
    queryKey: [queryKeys.DAILY_RECORD, year, month, day],
    queryFn: () => getDailyData(year, month, day),
    enabled: !!year && !!month && !!day,
    retry: false,
  });
  // dailyData가 변경될 때마다 쿼리 무효화
  useEffect(() => {
    if (dailyData) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.DAILY_RECORD, year, month, day] });
    }
  }, [dailyData, queryClient, year, month, day]);

  useEffect(() => {
    if (isError && error) {
      setErrorContext(error instanceof Error ? error.message : '에러 메시지 읽기 실패');
      setIsErrorModalOpen(true);
    }
  }, [isError, error]);

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    refetch(); // 요청 다시 시도
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // 기본 값으로 사용할 dailyRecord 객체 설정
  const defaultDailyRecord: DailyRecord = {
    alcohol: false,
    caffeine: false,
    smoking: false,
    exercise: false,
    description: null,
  };

  return (
    <div className="pb-32">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}
      <CustomCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
      {dailyData?.panicRecord && dailyData.panicRecord.length > 0 && <PanicRecord panicList={dailyData.panicRecord} />}
      <TodayRecord
        training={
          dailyData?.trainingRecord ? { date: `${year}-${month}-${day}`, trainingList: dailyData.trainingRecord } : null
        }
        date={selectedDate || new Date()}
        record={dailyData?.dailyRecord ?? defaultDailyRecord}
      />
    </div>
  );
}

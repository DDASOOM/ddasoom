package com.ddasoom.diary_service.diary.adapter.in.web.response;

import com.ddasoom.diary_service.diary.application.domain.DailyRecordInfo;
import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import com.ddasoom.diary_service.diary.application.domain.TrainingRecordInfo;

public record CalendarResponse(PanicRecordInfo panicRecord,
                               TrainingRecordInfo trainingRecord,
                               DailyRecordInfo dailyRecord) {

}

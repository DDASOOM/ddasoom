package com.ddasoom.diary_service.diary.application.port.in;

import com.ddasoom.diary_service.diary.adapter.in.web.response.GetContinuousTrainingDaysResponse;
import com.ddasoom.diary_service.diary.adapter.in.web.response.GetTodayTrainingResponse;
import java.time.LocalDate;

public interface TrainingUseCase {

    void saveTrainingRecord(Long userId, String trainingType);

    GetContinuousTrainingDaysResponse getContinuousTrainingDays(Long userId);

    GetTodayTrainingResponse getTodayTraining(Long userId, LocalDate now);
}

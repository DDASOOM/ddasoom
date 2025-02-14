package com.ddasoom.diary_service.diary.adapter.out.training;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.port.out.TrainingRecordPort;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TrainingRecordAdapter implements TrainingRecordPort {

    private final TrainingRepository trainingRepository;

    @Override
    public void saveTrainingRecord(Long userId, String trainingType) {
        trainingRepository.save(
                TrainingJpaEntity.builder()
                        .userId(userId)
                        .trainingType(trainingType)
                        .build()
        );
    }

    @Override
    public boolean existTrainingRecordBy(Long userId, String trainingType, LocalDate date) {
        return trainingRepository.existsByUserIdAndTrainingTypeAndDate(userId, trainingType, date);
    }

    @Override
    public boolean existTrainingBy(Long userId, LocalDate date) {
        return trainingRepository.existsByUserIdAndDate(userId, date);
    }

    @Override
    public List<String> getTrainingRecord(Long userId, int year, int month, int day) {
        return trainingRepository.findAllByUserIdAndDay(userId, year, month, day);
    }

    @Override
    public List<Integer> getTrainingThreeContinuousDay(Long userId, int year, int month) {
        return trainingRepository.findAllContinuousDay(userId, year, month);
    }
}

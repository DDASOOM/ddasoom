package com.ddasoom.diary_service.diary.adapter.out.training;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "training_record")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TrainingJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "training_record_id")
    private Long id;

    private Long userId;

    @CreationTimestamp
    private LocalDate date;

    private String trainingType;

    @Builder
    private TrainingJpaEntity(Long userId, String trainingType) {
        this.userId = userId;
        this.trainingType = trainingType;
    }
}

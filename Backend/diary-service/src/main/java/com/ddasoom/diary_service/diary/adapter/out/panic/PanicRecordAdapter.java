package com.ddasoom.diary_service.diary.adapter.out.panic;

import com.ddasoom.diary_service.common.annotation.PersistenceAdapter;
import com.ddasoom.diary_service.diary.application.domain.PanicRecordInfo;
import com.ddasoom.diary_service.diary.application.domain.PanicReportInfo;
import com.ddasoom.diary_service.diary.application.port.out.PanicRecordPort;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class PanicRecordAdapter implements PanicRecordPort {

    private final PanicRepository panicRepository;

    @Override
    public PanicRecordInfo getPanicRecord(Long userId, int year, int month, int day) {
        return panicRepository.findByUserIdAndDate(userId, year, month, day)
                .map(PanicJpaEntity::toRecordInfo)
                .orElse(null);
    }

    @Override
    public List<PanicReportInfo> getPanicReport(Long userId, int year, int month) {
        return panicRepository.findAllByUserIdAndDate(userId, year, month).stream()
                .map(PanicJpaEntity::toReportInfo)
                .toList();
    }
}

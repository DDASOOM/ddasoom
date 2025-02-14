package com.ddasoom.emergency_service.emergency.adapter.in.web.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class SavePanicRequest {

    private Long userId;
    private int duration;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String address;
    private String description;
    private LocalDateTime startDate;

    public SavePanicRequest(int duration, BigDecimal latitude, BigDecimal longitude,
            String address, String description, LocalDateTime startDate) {
        this.duration = duration;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.description = description;
        this.startDate = startDate;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}

package com.ddasoom.user_service.user.adapter.in.web.response;

public record GetUserInfoResponse(
        String name,
        Integer continuousTrainingDays,
        int experience,
        int level,
        double experiencePercent,
        int strokeCount,
        int hugCount,
        int playCount
) {

}

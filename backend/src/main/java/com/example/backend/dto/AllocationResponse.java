package com.example.backend.dto;

import com.example.backend.model.SeatingAssignment;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

// This annotation ensures we don't send null fields in the JSON response
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AllocationResponse {
    private List<SeatingAssignment> plan;
    private String error;

    // Static factory methods for convenience
    public static AllocationResponse withPlan(List<SeatingAssignment> plan) {
        AllocationResponse response = new AllocationResponse();
        response.plan = plan;
        return response;
    }

    public static AllocationResponse withError(String error) {
        AllocationResponse response = new AllocationResponse();
        response.error = error;
        return response;
    }

    // Getters are needed for Jackson
    public List<SeatingAssignment> getPlan() {
        return plan;
    }

    public String getError() {
        return error;
    }
}
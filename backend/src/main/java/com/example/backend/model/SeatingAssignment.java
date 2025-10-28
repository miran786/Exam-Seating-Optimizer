package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SeatingAssignment {
    @JsonProperty("RollNumber")
    private String rollNumber;

    @JsonProperty("HallID")
    private String hallID;

    @JsonProperty("SeatNumber")
    private int seatNumber;

    public SeatingAssignment(String rollNumber, String hallID, int seatNumber) {
        this.rollNumber = rollNumber;
        this.hallID = hallID;
        this.seatNumber = seatNumber;
    }

    // Getters are needed for JSON serialization
    public String getRollNumber() {
        return rollNumber;
    }

    public String getHallID() {
        return hallID;
    }

    public int getSeatNumber() {
        return seatNumber;
    }
}
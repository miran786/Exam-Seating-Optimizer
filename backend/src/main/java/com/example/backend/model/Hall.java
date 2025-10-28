package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Hall {
    @JsonProperty("HallID")
    private String hallID;

    @JsonProperty("Capacity")
    private int capacity;

    @JsonProperty("IsAccessible")
    private String isAccessible; // Read as String for robust boolean parsing

    // Default constructor
    public Hall() {}

    public String getHallID() {
        return hallID;
    }

    public int getCapacity() {
        return capacity;
    }

    public boolean getIsAccessible() {
        if (isAccessible == null) {
            return false;
        }
        String lower = isAccessible.toLowerCase().trim();
        return lower.equals("true") || lower.equals("yes") || lower.equals("1");
    }

    // Setters
    public void setHallID(String hallID) {
        this.hallID = hallID;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setIsAccessible(String isAccessible) {
        this.isAccessible = isAccessible;
    }
}
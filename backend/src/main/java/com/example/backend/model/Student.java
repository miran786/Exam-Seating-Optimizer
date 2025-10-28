package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Student {
    // Use @JsonProperty to match the exact keys from your CSV/JSON
    @JsonProperty("RollNumber")
    private String rollNumber;

    @JsonProperty("NeedsAccessibility")
    private String needsAccessibility; // Read as String to handle "true", "yes", "1"

    // Default constructor for JSON deserialization
    public Student() {}

    public Student(String rollNumber, String needsAccessibility) {
        this.rollNumber = rollNumber;
        this.needsAccessibility = needsAccessibility;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    // This is the Java version of your 'parseBoolean' utility
    public boolean getNeedsAccessibility() {
        if (needsAccessibility == null) {
            return false;
        }
        String lower = needsAccessibility.toLowerCase().trim();
        return lower.equals("true") || lower.equals("yes") || lower.equals("1");
    }
    
    // Setters are also needed by Jackson
    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public void setNeedsAccessibility(String needsAccessibility) {
        this.needsAccessibility = needsAccessibility;
    }
}
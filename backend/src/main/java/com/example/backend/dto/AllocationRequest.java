package com.example.backend.dto;

import com.example.backend.model.Hall;
import com.example.backend.model.Student;

import java.util.List;

// This object represents the incoming API request from your React app.
public class AllocationRequest {
    private List<Student> students;
    private List<Hall> halls;

    // Getters and Setters are needed for Jackson
    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<Hall> getHalls() {
        return halls;
    }

    public void setHalls(List<Hall> halls) {
        this.halls = halls;
    }
}
package com.example.backend.service;

import com.example.backend.dto.AllocationResponse;
import com.example.backend.model.Hall;
import com.example.backend.model.SeatingAssignment;
import com.example.backend.model.Student;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.*;

@Service
public class AllocationService {

    // Helper class to track remaining capacity
    private static class HallCapacity {
        int remaining;
        int total;
        Hall hall;

        HallCapacity(Hall hall) {
            this.hall = hall;
            this.total = hall.getCapacity();
            this.remaining = hall.getCapacity();
        }
    }

    public AllocationResponse generateGreedyPlan(List<Student> students, List<Hall> halls) {
        // --- Data Validation and Cleaning ---
        if (students == null || students.isEmpty() || halls == null || halls.isEmpty()) {
            return AllocationResponse.withError("Student or hall data is missing.");
        }

        List<Student> cleanedStudents = students.stream()
                .filter(s -> s.getRollNumber() != null && !s.getRollNumber().isBlank())
                .collect(Collectors.toList());
        
        Map<String, HallCapacity> hallCapacities = halls.stream()
                .filter(h -> h.getHallID() != null && h.getCapacity() > 0)
                .collect(Collectors.toMap(Hall::getHallID, HallCapacity::new, (a, b) -> a)); // Added merge function for safety
        
        if (cleanedStudents.isEmpty() || hallCapacities.isEmpty()) {
            return AllocationResponse.withError("Valid student or hall data is missing.");
        }

        // --- 1. Prioritize Accessible Seating ---
        List<Student> accessibleStudents = cleanedStudents.stream()
                .filter(Student::getNeedsAccessibility)
                .collect(Collectors.toList());
        List<Student> otherStudents = cleanedStudents.stream()
                .filter(s -> !s.getNeedsAccessibility())
                .collect(Collectors.toList());

        List<HallCapacity> accessibleHalls = hallCapacities.values().stream()
                .filter(hc -> hc.hall.getIsAccessible())
                .collect(Collectors.toList());

        List<SeatingAssignment> plan = new ArrayList<>();
        int studentIndex = 0;

        // Allocate accessible students to accessible halls
        for (HallCapacity hallInfo : accessibleHalls) {
            while (hallInfo.remaining > 0 && studentIndex < accessibleStudents.size()) {
                Student student = accessibleStudents.get(studentIndex);
                plan.add(new SeatingAssignment(
                        student.getRollNumber(),
                        hallInfo.hall.getHallID(),
                        hallInfo.total - hallInfo.remaining + 1
                ));
                hallInfo.remaining--;
                studentIndex++;
            }
        }

        if (studentIndex < accessibleStudents.size()) {
            return AllocationResponse.withError("Not enough accessible seats for all students with special needs.");
        }

        // --- 2. Allocate Remaining Students ---
        // Sort remaining students by Roll Number
        otherStudents.sort(Comparator.comparing(Student::getRollNumber));

        // Get all halls and sort by remaining capacity (descending)
        List<HallCapacity> allHallsSorted = new ArrayList<>(hallCapacities.values());
        allHallsSorted.sort((a, b) -> b.remaining - a.remaining);

        int remainingStudentIndex = 0;
        for (HallCapacity hallInfo : allHallsSorted) {
            while (hallInfo.remaining > 0 && remainingStudentIndex < otherStudents.size()) {
                Student student = otherStudents.get(remainingStudentIndex);
                plan.add(new SeatingAssignment(
                        student.getRollNumber(),
                        hallInfo.hall.getHallID(),
                        hallInfo.total - hallInfo.remaining + 1
                ));
                hallInfo.remaining--;
                remainingStudentIndex++;
            }
        }

        if (remainingStudentIndex < otherStudents.size()) {
            return AllocationResponse.withError("Not enough seats for all students.");
        }

        // Sort final plan by roll number
        plan.sort(Comparator.comparing(SeatingAssignment::getRollNumber));
        
        return AllocationResponse.withPlan(plan);
    }
}
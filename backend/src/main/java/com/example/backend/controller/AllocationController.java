package com.example.backend.controller;

import com.example.backend.dto.AllocationRequest;
import com.example.backend.dto.AllocationResponse;
import com.example.backend.service.AllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AllocationController {

    private final AllocationService allocationService;

    @Autowired
    public AllocationController(AllocationService allocationService) {
        this.allocationService = allocationService;
    }

    @PostMapping("/generate-plan")
    public ResponseEntity<AllocationResponse> generatePlan(@RequestBody AllocationRequest request) {
        AllocationResponse response = allocationService.generateGreedyPlan(
                request.getStudents(),
                request.getHalls()
        );
        
        if (response.getError() != null) {
            // If there's an error, send a 400 Bad Request status
            return ResponseEntity.badRequest().body(response);
        }
        
        // Otherwise, send a 200 OK status
        return ResponseEntity.ok(response);
    }
}
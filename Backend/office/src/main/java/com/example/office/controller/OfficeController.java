package com.example.office.controller;

import com.example.office.model.UserRegister;
import com.example.office.service.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OfficeController {

    @Autowired
    OfficeService offservice;
    @PostMapping("/save")
    public void add(UserRegister users) {
        offservice.add(users);
    }
}

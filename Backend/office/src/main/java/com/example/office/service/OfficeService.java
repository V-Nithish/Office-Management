package com.example.office.service;

import com.example.office.model.UserRegister;
import com.example.office.repository.Officerepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OfficeService {
    @Autowired
    Officerepository offrepo;

    public void add(UserRegister users){
        offrepo.save(users);
    }
}

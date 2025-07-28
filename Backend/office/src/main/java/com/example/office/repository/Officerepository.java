package com.example.office.repository;

import com.example.office.model.UserRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Officerepository extends JpaRepository<UserRegister,Integer> {
}

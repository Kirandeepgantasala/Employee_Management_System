package com.kirandeep.empmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kirandeep.empmanagement.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}

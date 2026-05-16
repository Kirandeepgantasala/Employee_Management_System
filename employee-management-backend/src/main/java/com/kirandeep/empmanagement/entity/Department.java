package com.kirandeep.empmanagement.entity;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
@Data
@Entity
public class Department {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer departmentId;
	
	
	private String departmentName;
	

@OneToMany(mappedBy="department")	
	private List<Employee> employees;
}

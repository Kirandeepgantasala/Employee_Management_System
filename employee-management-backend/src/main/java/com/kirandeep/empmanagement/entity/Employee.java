package com.kirandeep.empmanagement.entity;

import com.kirandeep.empmanagement.authentication.entity.AppUser;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer employeeId;
	
	private String employeeName;
	
	@Column(unique=true,nullable=false)
	private String email;
	
	private Double salary;
	
	private String designation;
	
	
	@ManyToOne
	@JoinColumn(name="departmentId")
	private Department department;
	
	@OneToOne(optional=false,cascade=CascadeType.ALL)
	@JoinColumn(name="app_user_id",nullable=false)
	private AppUser appUser;
}

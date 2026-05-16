package com.kirandeep.empmanagement.dto;

import lombok.Data;

@Data
public class CreateEmployeeRequestDto {

	
	private String employeeName;
	
	private String designation;
	
	private Integer departmentId;
	
	private String email;
	
	private Double salary;
}

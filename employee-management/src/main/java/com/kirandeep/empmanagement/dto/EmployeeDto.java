package com.kirandeep.empmanagement.dto;

import lombok.Data;

@Data
public class EmployeeDto {

private Integer employeeId;
	
	private String employeeName;
	
	private String email;
	
	private Double salary;
	
	private String designation;
	
	private Integer departmentId;
	
	private String departmentName;
}

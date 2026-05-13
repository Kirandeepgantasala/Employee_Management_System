package com.kirandeep.empmanagement.dto;

import lombok.Data;

@Data
public class UpdateEmployeeRequestDto {
	    
	private String employeeName;
	
	private String designation;
	
    private String email;
	
	private Double salary;
}

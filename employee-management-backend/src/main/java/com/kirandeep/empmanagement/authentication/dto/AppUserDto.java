package com.kirandeep.empmanagement.authentication.dto;

import lombok.Data;

@Data
public class AppUserDto {

	private Integer id;
	private String email;
	private Boolean enabled;
	private String role;
	
	
}

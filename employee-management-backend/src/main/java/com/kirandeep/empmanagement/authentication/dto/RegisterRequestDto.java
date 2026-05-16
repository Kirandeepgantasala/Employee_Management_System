package com.kirandeep.empmanagement.authentication.dto;

import lombok.Data;

@Data
public class RegisterRequestDto {

	private String email;
	
	private String password;
}

package com.kirandeep.empmanagement.authentication.service;

import org.springframework.stereotype.Service;

import com.kirandeep.empmanagement.authentication.dto.PasswordResetTokenDto;
import com.kirandeep.empmanagement.authentication.entity.PasswordResetToken;


public interface PasswordResetTokenService {

	public void resetPassword(String token,PasswordResetTokenDto pwdResetTokenDto); 
	
	public String generateToken(String email);
	
}

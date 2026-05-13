package com.kirandeep.empmanagement.authentication.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kirandeep.empmanagement.authentication.dto.AuthResponseDto;
import com.kirandeep.empmanagement.authentication.dto.LoginRequestDto;
import com.kirandeep.empmanagement.authentication.dto.PasswordResetTokenDto;
import com.kirandeep.empmanagement.authentication.dto.RegisterRequestDto;
import com.kirandeep.empmanagement.authentication.service.PasswordResetTokenService;
import com.kirandeep.empmanagement.dto.SignUpResponseDto;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {
	private AuthService authService;
	private PasswordResetTokenService pwdResetTokenService;
	public AuthController(AuthService authService, PasswordResetTokenService pwdResetTokenService) {
		this.authService=authService;
		this.pwdResetTokenService=pwdResetTokenService;
	}

	@PostMapping("/register")
	public ResponseEntity<SignUpResponseDto> register(@RequestBody RegisterRequestDto registerRequestDto){
		return ResponseEntity.ok(authService.register(registerRequestDto));
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
		return ResponseEntity.ok(authService.login(loginRequestDto));
		
	}
	
	@PostMapping("/reset-password/{token}")
	public ResponseEntity<Map<String,String>> resetPassword(@PathVariable String token,@RequestBody PasswordResetTokenDto pwdResetTokenDto){
		
		pwdResetTokenService.resetPassword(token, pwdResetTokenDto);
	System.out.println(token);
	Map<String,String> response = new HashMap<>();
	response.put("message", "Password Reset SuccessFully");
		return new ResponseEntity<>(response,HttpStatus.OK);
		
	}
	
	
	
}

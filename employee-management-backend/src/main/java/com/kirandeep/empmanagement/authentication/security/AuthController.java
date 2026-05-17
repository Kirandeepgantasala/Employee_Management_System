package com.kirandeep.empmanagement.authentication.security;

import java.util.HashMap;
import java.util.Map;

import com.kirandeep.empmanagement.authentication.dto.*;
import com.kirandeep.empmanagement.authentication.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kirandeep.empmanagement.authentication.service.PasswordResetTokenService;
import com.kirandeep.empmanagement.dto.SignUpResponseDto;
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
	private final AuthService authService;
    private final PasswordResetTokenService pwdResetTokenService;
	private final AppUserService appUserService;


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
	@PostMapping("/forgot-password")
	public ResponseEntity<Map<String,String>> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto){
		appUserService.forgotPassword(forgotPasswordDto.getEmail());
	Map<String,String> response = new HashMap<>();
	response.put("message","Password Reset Link Sent Successfully");
	return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	
}

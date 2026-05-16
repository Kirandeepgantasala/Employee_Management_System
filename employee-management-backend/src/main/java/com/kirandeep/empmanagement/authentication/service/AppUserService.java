package com.kirandeep.empmanagement.authentication.service;

import java.util.List;


import com.kirandeep.empmanagement.authentication.dto.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.kirandeep.empmanagement.authentication.entity.AppUser;
import com.kirandeep.empmanagement.authentication.enums.Role;
import com.kirandeep.empmanagement.authentication.repository.AppUserRepository;
import com.kirandeep.empmanagement.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserService {

	private final AppUserRepository appUserRepository;
	private final PasswordEncoder passwordEncoder;
	private final PasswordResetTokenService passwordResetTokenService;
	private final EmailService emailService;

	public List<AppUserDto> getAllUsers(){
		
		
		List<AppUser> allUsers = appUserRepository.findAll();
		
		List<AppUserDto> allUsersDto = 
		
		allUsers
		.stream()
		.map(
				a->{
			AppUserDto appUserDto = new AppUserDto();
			appUserDto.setEmail(a.getEmail());
			appUserDto.setId(a.getId());
			appUserDto.setRole(a.getRole().toString());
			appUserDto.setEnabled(a.getEnabled());
			return appUserDto;
		})
		.toList();
		
		return allUsersDto;
		
	}
	
	public AppUserDto promoteRoleToHR(Integer id) {
		
		AppUser appUser = 
				appUserRepository
				.findById(id)
				.orElseThrow(()->new UserNotFoundException("User Not Found with id: "+id));
		
			appUser.setRole(Role.HR);
		AppUser updatedUser = 	appUserRepository.save(appUser);
			
		AppUserDto dto = new AppUserDto();
			dto.setEmail(updatedUser.getEmail());
			dto.setId(updatedUser.getId());
			dto.setRole(updatedUser.getRole().toString());
			dto.setEnabled(updatedUser.getEnabled());
			
			return dto;
			
		
		
	}
	
	
	public AppUserDto updateRole(Integer id,UpdateUserRoleDto updateUserRole) {

		
		AppUser appUser = 
		appUserRepository
		.findById(id)
		.orElseThrow(()->new UserNotFoundException("User Not Found with id: "+id));
		
			
			appUser.setRole(Role.valueOf(updateUserRole.getRole()));
			AppUser updatedUser = appUserRepository.save(appUser);
			
			AppUserDto appUserDto = new AppUserDto();
			appUserDto.setId(updatedUser.getId());
			appUserDto.setEmail(updatedUser.getEmail());
			appUserDto.setEnabled(updatedUser.getEnabled());
			appUserDto.setRole(updatedUser.getRole().toString());
			;
			
			
			return appUserDto;
		
		
		
		
	}
	
	public AppUserDto updateStatus(Integer id,UpdateUserStatusDto updateAccessDto) {
		
		
		
		AppUser appUser = 
				appUserRepository
				.findById(id)
				.orElseThrow(()->new UserNotFoundException("User Not Found with id: "+id));
			
			appUser.setEnabled(updateAccessDto.getEnabled());
			AppUser updatedUser = appUserRepository.save(appUser);
				
				AppUserDto appUserDto = new AppUserDto();
				appUserDto.setId(updatedUser.getId());
				appUserDto.setEmail(updatedUser.getEmail());
				appUserDto.setEnabled(updatedUser.getEnabled());
				System.out.println(updateAccessDto.getEnabled());
				appUserDto.setRole(updatedUser.getRole().toString());
				
			return appUserDto;
			
		
		
	}


	public void forgotPassword(String email){
		String token = passwordResetTokenService.generateToken(email);
		String subject="Reset Password";
		String body = "Hello, "+email+"\n Please find the below link:"+"http://localhost:4200/reset-password/"+token
				+"\n"+"This Link will Expire in 1 Hour";
		emailService.sendEmail(email,subject,body);
	}




	
	
	
	
	
	
	
}

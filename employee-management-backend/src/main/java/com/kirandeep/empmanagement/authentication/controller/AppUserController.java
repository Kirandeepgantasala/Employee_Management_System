package com.kirandeep.empmanagement.authentication.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kirandeep.empmanagement.authentication.dto.AppUserDto;
import com.kirandeep.empmanagement.authentication.dto.UpdateUserRoleDto;
import com.kirandeep.empmanagement.authentication.dto.UpdateUserStatusDto;
import com.kirandeep.empmanagement.authentication.service.AppUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class AppUserController {

	private final AppUserService appUserService;
	
	@GetMapping("/allusers")
	public ResponseEntity<List<AppUserDto>> getAllUsers(){
		List<AppUserDto> allUsers = appUserService.getAllUsers();
		return ResponseEntity.ok(allUsers);
	}
	
	
	
	@PatchMapping("/{id}/promote-to-hr")
	public ResponseEntity<AppUserDto> updateRoleToHR(@PathVariable Integer id){
		AppUserDto appUserDto = appUserService.promoteRoleToHR(id);
		return ResponseEntity.ok(appUserDto);
	}
	
	@PatchMapping("/{id}/role")
	public ResponseEntity<AppUserDto> updateUserRole(@PathVariable Integer id,@RequestBody UpdateUserRoleDto updateUserRoleDto){
		AppUserDto appUserDto = appUserService.updateRole(id, updateUserRoleDto);
		return ResponseEntity.ok(appUserDto);
	}
	
	@PatchMapping("/{id}/status")
	public ResponseEntity<AppUserDto> updateUserStatus(@PathVariable Integer id,@RequestBody UpdateUserStatusDto updateUserStatusDto){
		AppUserDto appUserDto = appUserService.updateStatus(id, updateUserStatusDto);
		return ResponseEntity.ok(appUserDto);
	}


	
	
}

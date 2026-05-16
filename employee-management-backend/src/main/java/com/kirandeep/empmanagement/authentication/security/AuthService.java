package com.kirandeep.empmanagement.authentication.security;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kirandeep.empmanagement.authentication.dto.AuthResponseDto;
import com.kirandeep.empmanagement.authentication.dto.LoginRequestDto;
import com.kirandeep.empmanagement.authentication.dto.RegisterRequestDto;
import com.kirandeep.empmanagement.authentication.repository.AppUserRepository;
import com.kirandeep.empmanagement.dto.SignUpResponseDto;
import com.kirandeep.empmanagement.authentication.entity.AppUser;
import com.kirandeep.empmanagement.authentication.enums.Role;
@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final AppUserRepository appUserRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JWTUtil jwtUtil;
	private final AppUserDetailsService appUserDetailsService;


	public SignUpResponseDto register(RegisterRequestDto registerRequestDto) {
		Optional<AppUser> existingUser = appUserRepository.findByEmail(registerRequestDto.getEmail());
		if(existingUser.isPresent()) {
			throw new RuntimeException("Email Already Exists");
		}
		AppUser appUser = new AppUser();
			appUser.setEmail(registerRequestDto.getEmail());
			appUser.setRole(Role.EMPLOYEE);
			appUser.setEnabled(true);
			appUser.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
			appUserRepository.save(appUser);

		return new SignUpResponseDto(appUser.getId(), appUser.getEmail());
		
	}
	
	public AuthResponseDto login(LoginRequestDto loginRequestDto) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken
				(loginRequestDto.getEmail(), loginRequestDto.getPassword()));
		AppUser user =(AppUser) authentication.getPrincipal();


			String token = jwtUtil.generateToken(user);

			AuthResponseDto authResponseDto = new AuthResponseDto();
			authResponseDto.setToken(token);
			authResponseDto.setRole(user.getRole().toString());
			authResponseDto.setEmail(user.getEmail());

			return authResponseDto;

    }
	
}

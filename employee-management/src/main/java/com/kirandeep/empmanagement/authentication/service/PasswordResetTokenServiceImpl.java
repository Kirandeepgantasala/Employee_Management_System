package com.kirandeep.empmanagement.authentication.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kirandeep.empmanagement.authentication.dto.PasswordResetTokenDto;
import com.kirandeep.empmanagement.authentication.entity.AppUser;
import com.kirandeep.empmanagement.authentication.entity.PasswordResetToken;
import com.kirandeep.empmanagement.authentication.repository.AppUserRepository;
import com.kirandeep.empmanagement.authentication.repository.PasswordResetTokenRepository;
import com.kirandeep.empmanagement.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {

	private final PasswordResetTokenRepository pwdResetTokenRepository;
	private final AppUserRepository appUserRepository;
	private final PasswordEncoder pwdEncoder;
	@Override

	public String generateToken(String email) {
		AppUser user = appUserRepository.
				findByEmail(email)
				.orElseThrow(()->new UserNotFoundException("User Not Found"));
		
		String token = UUID.randomUUID().toString();
		
		PasswordResetToken pwdResetToken = new PasswordResetToken();
		pwdResetToken.setExpiry(LocalDateTime.now().plusHours(1));
		pwdResetToken.setIsTokenUsed(false);
		pwdResetToken.setToken(token);
		pwdResetToken.setAppUser(user);
		pwdResetTokenRepository.save(pwdResetToken);
		
		return token;
	}
	
@Override
	public void resetPassword(String token,PasswordResetTokenDto pwdResetTokenDto) {
		
	PasswordResetToken pwdResetToken = 	this.pwdResetTokenRepository
			.findByToken(token)
		.orElseThrow(()->new RuntimeException("Token Not Found"));
		
if(pwdResetToken.getExpiry().isBefore(LocalDateTime.now())) {
		
		throw new RuntimeException("Token is expired");
	}
if(pwdResetToken.getIsTokenUsed()) {
		throw new RuntimeException("Token is already Used");
	}


AppUser appUser = pwdResetToken.getAppUser();

appUser.setPassword(this.pwdEncoder.encode(pwdResetTokenDto.getNewPassword()));
appUserRepository.save(appUser);


pwdResetToken.setIsTokenUsed(true);
pwdResetTokenRepository.save(pwdResetToken);

		
	}
	
	
	

}

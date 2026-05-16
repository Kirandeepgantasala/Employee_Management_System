package com.kirandeep.empmanagement.authentication.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kirandeep.empmanagement.authentication.repository.AppUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService{

	private final AppUserRepository appUserRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return appUserRepository.findByEmail(username)
				.orElseThrow(()->new UsernameNotFoundException("username not found"+username));
	}

	
}

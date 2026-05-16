package com.kirandeep.empmanagement.authentication.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.kirandeep.empmanagement.authentication.entity.AppUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
@Component
public class JWTUtil {

	@Value("${jwt.secret}")
	private String jwtSecret; 
	
	@Value("${jwt.expiration}")
	private Integer jwtExpirationMs;
	
	private SecretKey key;
	
	
	@PostConstruct
	public void init() {
		this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
	}
	
public String generateToken(AppUser user) {
	
	
	
	
	
	List<String> roles = user.getAuthorities()
			.stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.toList());
	return Jwts
			.builder()
			.subject(user.getEmail())
			.claim("roles",roles)
			
			.issuedAt(new Date())
		    .expiration(new Date((new Date().getTime() + jwtExpirationMs ) ))
			.signWith(key)
			.compact();
}

public String getEmailFromToken(String token) {
	
	
	Claims claims =  Jwts
			.parser()
			.verifyWith(key)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			;
	
	return claims.getSubject();
}


}

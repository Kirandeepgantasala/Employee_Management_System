package com.kirandeep.empmanagement.authentication.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.kirandeep.empmanagement.authentication.entity.AppUser;
import com.kirandeep.empmanagement.authentication.repository.AppUserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter{
private final AppUserRepository appUserRepository;
private final JWTUtil jwtUtil;
private final HandlerExceptionResolver handlerExceptionResolver;



	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		
		
		String path = request.getRequestURI();

		if (path.startsWith("/auth/")
				) {
		    filterChain.doFilter(request, response);
		    return;
		}

		try {
		log.info("Incoming request:"+request.getRequestURI());
		
		final String requestTokenHeader = request.getHeader("Authorization");
		if(requestTokenHeader==null || !requestTokenHeader.startsWith("Bearer")) {
			filterChain.doFilter(request, response);
			return;
		}
		String token = requestTokenHeader.split("Bearer ")[1];
		
		String email = jwtUtil.getEmailFromToken(token);
		
		if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			AppUser user = appUserRepository.findByEmail(email).orElseThrow();
			
			UsernamePasswordAuthenticationToken userNameAndPasswordAuthenticationToken =new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(userNameAndPasswordAuthenticationToken);
			
		}
		
		filterChain.doFilter(request, response);
		
	}
		catch (Exception ex) {
		handlerExceptionResolver.resolveException(request, response, null, ex);
		}
	
	
}
}

package com.kirandeep.empmanagement.authentication.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {
	
	private final JwtAuthFilter jwtAuthFiler;

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}


    @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.cors(Customizer.withDefaults())
		.csrf(csrf -> csrf.disable())
		.sessionManagement(sessionConfig->sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.authorizeHttpRequests(auth ->
		auth
		 .requestMatchers(
			        HttpMethod.OPTIONS, "/**").permitAll()
		.requestMatchers("/auth/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/employees/profile")
		   .hasRole("EMPLOYEE")
		.requestMatchers(HttpMethod.GET,"/employees/**")
		   .hasAnyRole("ADMIN","HR")
		.requestMatchers(HttpMethod.POST,"/employees/**")
		   .hasAnyRole("ADMIN","HR")
		.requestMatchers(HttpMethod.PATCH,"/employees/**")
		   .hasAnyRole("ADMIN","HR")
		.requestMatchers(HttpMethod.DELETE,"/employees/**")
		   .hasAnyRole("ADMIN","HR")
		.requestMatchers(HttpMethod.GET,"/users/**")
		.hasRole("ADMIN")
		.requestMatchers(HttpMethod.PATCH,"/users/**")
		.hasRole("ADMIN")
		.anyRequest().authenticated())
		.addFilterBefore(jwtAuthFiler, UsernamePasswordAuthenticationFilter.class);
		return http.build();
		
	}
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
    	
    	CorsConfiguration config = new CorsConfiguration();
    	config.setAllowedOrigins(List.of("http://localhost:4200",
				"https://kirandeep-employee-management-system.netlify.app"));
    	config.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
    	config.setAllowedHeaders(List.of("*"));
    	config.setAllowCredentials(true);
    	
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
    }
}

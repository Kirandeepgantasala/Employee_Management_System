package com.kirandeep.empmanagement.authentication.config;

import com.kirandeep.empmanagement.entity.Department;
import com.kirandeep.empmanagement.repository.DepartmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.kirandeep.empmanagement.authentication.entity.AppUser;
import com.kirandeep.empmanagement.authentication.enums.Role;
import com.kirandeep.empmanagement.authentication.repository.AppUserRepository;

@Configuration
public class DataInitialization {

	@Bean
	public CommandLineRunner createAdmin(PasswordEncoder passwordEncoder,AppUserRepository appUserRepository) {
		return args->{
		
			if(appUserRepository.findByEmail("adminSys@gmail.com").isEmpty()) {
				AppUser admin = new AppUser();
				admin.setEmail("adminSys@gmail.com");
				admin.setPassword(passwordEncoder.encode("admin@123"));
				admin.setRole(Role.ADMIN);
				admin.setEnabled(true);
				
				appUserRepository.save(admin);
			}
	};
	}
	

	@Bean
	public CommandLineRunner createHR(PasswordEncoder passwordEncoder,AppUserRepository appUserRepository) {
		return args->{
		
			if(appUserRepository.findByEmail("hrSys@gmail.com").isEmpty()) {
				AppUser hr = new AppUser();
				hr.setEmail("hrSys@gmail.com");
				hr.setPassword(passwordEncoder.encode("admin@123"));
				hr.setRole(Role.HR);
				hr.setEnabled(true);
				
				appUserRepository.save(hr);
			}
	};
}
@Bean
public CommandLineRunner createDepartments(DepartmentRepository departmentRepository){
		return args -> {
			if(departmentRepository.count()==0){
				Department d1 = new Department();
				d1.setDepartmentName("IT");

				Department d2 = new Department();
				d2.setDepartmentName("HR");

				Department d3 = new Department();
				d3.setDepartmentName("FINANCE");

				departmentRepository.save(d1);
				departmentRepository.save(d2);
				departmentRepository.save(d3);

			}
		};
}
}

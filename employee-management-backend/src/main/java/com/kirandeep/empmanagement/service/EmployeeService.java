package com.kirandeep.empmanagement.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.kirandeep.empmanagement.authentication.repository.AppUserRepository;
import com.kirandeep.empmanagement.authentication.repository.PasswordResetTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kirandeep.empmanagement.authentication.entity.AppUser;
import com.kirandeep.empmanagement.authentication.enums.Role;
import com.kirandeep.empmanagement.authentication.service.EmailService;
import com.kirandeep.empmanagement.authentication.service.PasswordResetTokenService;
import com.kirandeep.empmanagement.dto.CreateEmployeeRequestDto;
import com.kirandeep.empmanagement.dto.EmployeeDto;
import com.kirandeep.empmanagement.dto.UpdateEmployeeRequestDto;
import com.kirandeep.empmanagement.entity.Department;
import com.kirandeep.empmanagement.entity.Employee;
import com.kirandeep.empmanagement.exception.DepartmentNotFoundException;
import com.kirandeep.empmanagement.exception.EmployeeNotFoundException;
import com.kirandeep.empmanagement.repository.DepartmentRepository;
import com.kirandeep.empmanagement.repository.EmployeeRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeService {

	private final EmployeeRepository employeeRepository;
	private final DepartmentRepository departmentRepository;
	private final PasswordEncoder passwordEncoder;
	private final EmailService emailService;
	private final PasswordResetTokenService passwordResetTokenService;
	private final AppUserRepository appUserRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
	
	public EmployeeDto addEmployee(CreateEmployeeRequestDto empRequestDto) {
		
Department dept = departmentRepository.findById(empRequestDto.getDepartmentId()).orElseThrow(()->new DepartmentNotFoundException("Department Not Found with id: "+empRequestDto.getDepartmentId()));
		 if(employeeRepository.findByEmail(empRequestDto.getEmail()).isPresent()) {
			 throw new RuntimeException("Email Already Exists");
		 }


	AppUser appUser = new AppUser();
	appUser.setEmail(empRequestDto.getEmail());
	appUser.setEnabled(true);
	appUser.setRole(Role.EMPLOYEE);
	String rawPassword = UUID.randomUUID().toString().substring(0,8);
	appUser.setPassword(passwordEncoder.encode(rawPassword));
	
	
	Employee employee = new Employee();
	employee.setEmployeeName(empRequestDto.getEmployeeName());
	employee.setEmail(empRequestDto.getEmail());
	employee.setDesignation(empRequestDto.getDesignation());
	employee.setSalary(empRequestDto.getSalary());
	employee.setAppUser(appUser);
	
	employee.setDepartment(dept);
	appUser.setEmployee(employee);
	
	Employee savedEmployee = employeeRepository.save(employee);
	
	String token = passwordResetTokenService.generateToken(savedEmployee.getEmail());
	
	String mailBody = "Hello "+savedEmployee.getEmployeeName()+"\n\n"
	+"Login Credentials \n"+"Email:"+savedEmployee.getEmail()+"\n\n"+"Designation:"+savedEmployee.getDesignation()
	+"\n\n"+"Link to Reset Password: http://localhost:4200/reset-password/"+token+"\n"+"This link will expire in 1 hour";
//	try {
//	emailService.sendEmail(appUser.getEmail(), "Your login credentials",mailBody);
//	System.out.println("http://localhost:4200/reset-password/"+token);
//	}
//	catch(Exception e) {
//		e.printStackTrace();
//		throw new RuntimeException("Unable to send email",e);
//	}
		System.out.println("Reset Password link \n"+employee.getEmail()+"\n"+"https://kirandeep-employee-management-system.netlify.app/reset-password/"+token);
	EmployeeDto empDto = new EmployeeDto();
	
	empDto.setDepartmentId(dept.getDepartmentId());
	empDto.setDepartmentName(dept.getDepartmentName());
	empDto.setEmployeeId(savedEmployee.getEmployeeId());
	empDto.setEmployeeName(savedEmployee.getEmployeeName());
	empDto.setEmail(savedEmployee.getEmail());
	empDto.setDesignation(savedEmployee.getDesignation());
	empDto.setSalary(savedEmployee.getSalary());
	return empDto;
	
}

		
	
	
	public List<EmployeeDto> getAllEmployees(){
		List<Employee> employees = employeeRepository.findAll();
		List<EmployeeDto> employeesDto = new ArrayList<>();
		employees.stream().forEach(emp->{
			EmployeeDto dto = new EmployeeDto();
			dto.setDepartmentId(emp.getDepartment().getDepartmentId());
			dto.setDepartmentName(emp.getDepartment().getDepartmentName());
			dto.setEmployeeId(emp.getEmployeeId());
			dto.setEmployeeName(emp.getEmployeeName());
			dto.setEmail(emp.getEmail());
			dto.setDesignation(emp.getDesignation());
			dto.setSalary(emp.getSalary());
			employeesDto.add(dto);
		});
		return employeesDto;
	}
	
	public void deleteEmployee(Integer employeeId) {
	Employee employee =	employeeRepository.findById(employeeId).orElseThrow(()->
         new EmployeeNotFoundException("Employee Not found with id:" + employeeId)

        );
	AppUser appUser = employee.getAppUser();
	if(appUser!=null){
		passwordResetTokenRepository.deleteByAppUser(appUser);
	}
		employeeRepository.delete(employee);
		if(appUser!=null){
			appUserRepository.delete(appUser);
		}
	}
	
	public EmployeeDto updateEmployeeDetails(Integer employeeId,UpdateEmployeeRequestDto updateRequestDto) {
	
	
	Employee employee = employeeRepository
			.findById(employeeId)
			.orElseThrow(()->new EmployeeNotFoundException("Employee Not Found with id:"+employeeId));
	

		if(updateRequestDto.getEmployeeName()!=null) {
			employee.setEmployeeName(updateRequestDto.getEmployeeName());
		}
		if(updateRequestDto.getEmail()!=null) {
			employee.setEmail(updateRequestDto.getEmail());
			employee.getAppUser().setEmail(employee.getEmail());
		}
		if(updateRequestDto.getDesignation()!=null) {
			employee.setDesignation(updateRequestDto.getDesignation());
		}
		if(updateRequestDto.getSalary()!=null) {
			employee.setSalary(updateRequestDto.getSalary());
			
		}
		Employee savedEmployee = employeeRepository.save(employee);
		
		EmployeeDto employeeDto = mapToDto(savedEmployee);
	
		return employeeDto;
		
		
		
		
		}
	
	public EmployeeDto getEmployee(Integer id) {
		Employee employee = employeeRepository
				.findById(id)
				.orElseThrow(()->new EmployeeNotFoundException("Employee Not found with id: "+id));
		
			EmployeeDto dto = mapToDto(employee);
			return dto;
		
	}
	
	
	public EmployeeDto getByEmail(String email) {
		// TODO Auto-generated method stub
		Employee employee = employeeRepository
				.findByEmail(email)
				.orElseThrow(()->new EmployeeNotFoundException("Employee Not Found with email: "+email));
		
			return  mapToDto(employee);
		
	}
	
	
	public static EmployeeDto mapToDto(Employee emp) {
		EmployeeDto empDto = new EmployeeDto();
		empDto.setDepartmentId(emp.getDepartment().getDepartmentId());
		empDto.setDepartmentName(emp.getDepartment().getDepartmentName());
		empDto.setEmail(emp.getEmail());
		empDto.setEmployeeId(emp.getEmployeeId());
		empDto.setEmployeeName(emp.getEmployeeName());
		empDto.setDesignation(emp.getDesignation());
		empDto.setSalary(emp.getSalary());
		return empDto;
	}

	
	
	

}

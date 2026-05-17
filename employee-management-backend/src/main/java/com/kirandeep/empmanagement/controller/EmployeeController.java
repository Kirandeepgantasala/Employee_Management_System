package com.kirandeep.empmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kirandeep.empmanagement.dto.CreateEmployeeRequestDto;
import com.kirandeep.empmanagement.dto.EmployeeDto;
import com.kirandeep.empmanagement.dto.UpdateEmployeeRequestDto;
import com.kirandeep.empmanagement.service.EmployeeService;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
	private EmployeeService empService;
	public EmployeeController(EmployeeService empService) {
		this.empService=empService;
	}

	@PostMapping("/create-employee")
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody CreateEmployeeRequestDto employeeRequestDto) {
		
		EmployeeDto empDto = empService.addEmployee(employeeRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(empDto);
	}
	
	@GetMapping("/employees-list")
	public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
		List<EmployeeDto> employeesDto = empService.getAllEmployees();
		return ResponseEntity.ok(employeesDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable Integer id){
		empService.deleteEmployee(id);
		return ResponseEntity.noContent().build();
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Integer id,@RequestBody UpdateEmployeeRequestDto updateEmpRequestDto){
	EmployeeDto empDto = empService.updateEmployeeDetails(id, updateEmpRequestDto);
	return ResponseEntity.ok(empDto);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<EmployeeDto> getEmployee(Authentication auth){
		String email = auth.getName();
		return ResponseEntity.ok(empService.getByEmail(email));
	}
	
	@GetMapping("/getEmployee/{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Integer id){
		EmployeeDto empDto = this.empService.getEmployee(id);
		return ResponseEntity.ok(empDto);
	}
	

	
	
	
}

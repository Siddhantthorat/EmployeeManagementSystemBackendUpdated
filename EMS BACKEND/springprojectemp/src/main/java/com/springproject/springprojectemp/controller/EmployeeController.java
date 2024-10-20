package com.springproject.springprojectemp.controller;

import java.util.Base64;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.springproject.springprojectemp.dao.UserRepository;
import com.springproject.springprojectemp.entity.Employee;
import com.springproject.springprojectemp.entity.User;
import com.springproject.springprojectemp.exception.ResourceNotFoundException;
import com.springproject.springprojectemp.model.EmployeeUtilResponse;
import com.springproject.springprojectemp.service.EmployeeService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/login")
    public EmployeeUtilResponse login(@RequestHeader("Authorization") String auth) {
        logger.info("Login attempt with Authorization Header: {}", auth);

        String pair = new String(Base64.getDecoder().decode(auth.substring(6)));
        String password = pair.split(":")[1];
        String userName = pair.split(":")[0];

        logger.debug("Extracted username: {} and password", userName);

        Optional<User> optionalUser = repository.findByUserName(userName);
        EmployeeUtilResponse response = new EmployeeUtilResponse();

        if (optionalUser.isPresent()) {
            logger.debug("User found with username: {}", userName);

            User user = optionalUser.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                logger.info("User authenticated successfully: {}", userName);

                response.setCode(0);
                response.setStatus("Success");
                response.setMessage("User Authenticated Successfully");
                response.setData(user);
                return response;
            } else {
                logger.warn("Incorrect password for user: {}", userName);
                response.setCode(1);
                response.setStatus("Failure");
                response.setMessage("Wrong User Credentials");
            }
        } else {
            logger.warn("No user found with username: {}", userName);
            response.setCode(1);
            response.setStatus("Failure");
            response.setMessage("Wrong User Credentials");
        }

        return response;
    }

    @PostMapping("/employee")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public EmployeeUtilResponse saveEmployee(@RequestBody Employee employee) {
        logger.info("Saving new employee: {}", employee);

        float empPaid = employee.getAmount();
        float totalSalary = empPaid * 12;
        employee.setTotal(totalSalary);

        EmployeeUtilResponse response = employeeService.saveEmployee(employee);
        logger.info("Employee saved successfully: {}", employee);

        return response;
    }

    @GetMapping("/employee")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_MODERATOR') or hasAuthority('ROLE_USER')")
    public EmployeeUtilResponse getAllEmployeesByName() throws ResourceNotFoundException {
        logger.info("Fetching all employees by name");
        return employeeService.getAllEmployeesByName();
    }

    @DeleteMapping("/employee/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public EmployeeUtilResponse deleteEmployee(@PathVariable int id) {
        logger.info("Attempting to delete employee with id: {}", id);
        EmployeeUtilResponse response = employeeService.deleteEmployee(id);
        logger.info("Employee with id {} deleted successfully", id);
        return response;
    }

    @GetMapping("/employee/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public EmployeeUtilResponse getEmployeeById(@PathVariable int id) 
	{
    	logger.info("Fetched employee with id: {}", id);
		return employeeService.getEmployee(id);
	}
	
	@PutMapping("/employee/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public  EmployeeUtilResponse updateEmployeeById(@PathVariable int id,@RequestBody Employee employee) 
	{
		logger.info("Updating employee with id: {}", id);

		// Set the ID from the path variable
		employee.setId(id);
		float emppaid;
		float sal;
		emppaid=employee.getAmount();
		sal=emppaid*12;
		employee.setTotal(sal);
		logger.info("Going to service logic");
		return employeeService.updateEmployeeinService(employee);
	}
}

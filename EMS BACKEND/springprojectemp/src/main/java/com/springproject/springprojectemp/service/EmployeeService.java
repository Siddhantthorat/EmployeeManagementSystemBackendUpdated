package com.springproject.springprojectemp.service;

import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.springproject.springprojectemp.controller.EmployeeController;
import com.springproject.springprojectemp.dao.EmployeeDAO;
import com.springproject.springprojectemp.entity.Employee;
import com.springproject.springprojectemp.exception.ResourceNotFoundException;

import com.springproject.springprojectemp.model.EmployeeUtilResponse;
import com.springproject.springprojectemp.util.EmployeeUtil;


@Service
public class EmployeeService {
	
	private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);
	
	@Autowired
	private EmployeeDAO dao;
	
	public EmployeeUtilResponse saveEmployee(Employee employee)
	{ 
		EmployeeUtilResponse emp1= new EmployeeUtilResponse();
	
		
		try {
			
			EmployeeUtilResponse validationDetails = EmployeeUtil.validateEmployee(employee);
            if(validationDetails.getStatus().equals("Failure")) {
                return validationDetails;
            }
			
			 Employee emp=dao.save(employee);
			
			emp1.setCode(0);
			emp1.setStatus("Success");
			emp1.setMessage("Employees Details Saved Successfully");
			
			emp1.setData(emp);
			
		}
			
			
			

		catch(Exception e)
		{
			
			System.err.println(e.getMessage());
			emp1.setCode(1);
			emp1.setStatus("Failure");
	
		}
		return emp1;
	}	


	
	public EmployeeUtilResponse getAllEmployeesByName(){
		
		EmployeeUtilResponse empr= new EmployeeUtilResponse();
		try {
			List<Employee> employees = (List<Employee>)dao.findAll();
			
			empr.setCode(0);
			empr.setStatus("Success");
			empr.setMessage("Employees Details Displayed Successfully");
			
			empr.setData(employees);
			
			
		
		}
		catch(Exception e)
		{
			System.err.println(e.getMessage());
			
			empr.setCode(1);
			empr.setStatus("Failure");
			empr.setMessage("Employees Details Display Failed");
			
		
		}
		return empr;
	}
	

	public EmployeeUtilResponse getEmployee(int id) {
	    EmployeeUtilResponse empResponse = new EmployeeUtilResponse();

	    try {
	        // Fetch the employee by ID
	        Optional<Employee> employee = dao.findById(id);

	        // Handle case where the employee is not found
	        if (employee.isEmpty()) {
	            empResponse.setCode(1);
	            empResponse.setStatus("Failure");
	            empResponse.setMessage("Employee with this ID does not exist");
	            return empResponse;
	        }

	        // Success case - employee found
	        empResponse.setCode(0);
	        empResponse.setStatus("Success");
	        empResponse.setMessage("Employee details displayed successfully");
	        empResponse.setData(employee.get());  // Unwrap the Optional here

	    } catch (Exception e) {
	        // Log error and set failure response
	        logger.error("Error occurred while fetching employee details", e);
	        empResponse.setCode(1);
	        empResponse.setStatus("Failure");
	        empResponse.setMessage("Error fetching employee details");
	    }

	    return empResponse;
	}

	

	
	public EmployeeUtilResponse deleteEmployee(int id) 
	{
	
		EmployeeUtilResponse empr= new EmployeeUtilResponse();
		try 
		{
			
			dao.deleteById(id);
			empr.setCode(0);
			empr.setStatus("Success");
			empr.setMessage("Employees Deleted Successfully");
			
		}
		catch(Exception e)
		{
			System.err.println(e.getMessage());
			empr.setCode(1);
			empr.setStatus("Failure");
			empr.setMessage("Employee with this ID does not exists");
			
			return empr;
		}
		return empr;
		
	}
	
	
	public EmployeeUtilResponse updateEmployeeinService(Employee employee) {
	    EmployeeUtilResponse emp3 = new EmployeeUtilResponse();

	    try {
	        Optional<Employee> existingEmployee = dao.findById(employee.getId());
	        if (existingEmployee.isEmpty()) {
	            emp3.setCode(1);
	            emp3.setStatus("Failure");
	            emp3.setMessage("Employee with this Id does not Exist");
	            return emp3;
	        }

	        // Validation logic
	        EmployeeUtilResponse validationDetails = EmployeeUtil.validateEmployee(employee);
	        if (validationDetails.getStatus().equals("Failure")) {
	            return validationDetails;
	        }

	        // Update logic
	        Employee upEmployee = dao.save(employee);

	        emp3.setCode(0);
	        emp3.setStatus("Success");
	        emp3.setMessage("Employee Updated Successfully");
	        emp3.setData(upEmployee);

	    } catch (Exception e) {
	        logger.error("Error occurred while updating employee", e);  // Log the actual exception
	        emp3.setCode(1);
	        emp3.setStatus("Failure");
	        emp3.setMessage("Error updating employee");
	    }

	    return emp3;
	}

}
	


package com.rit.group2.controllers;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.rit.group2.models.Employee;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
@EnableAutoConfiguration
public class EmployeeController {

	@RequestMapping(method = RequestMethod.POST, value = "/create")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employee;
    }
	
	@RequestMapping(method = RequestMethod.GET, value = "/{userId}")
    public Employee getEmployee(@PathVariable("userId") int employeeId) {
        return new Employee("Nathan", "Connor", "home", "(585) 111-1111", "nxc5929@rit.edu");
    }
	
	@RequestMapping(method = RequestMethod.POST, value = "/{userId}/edit")
    public Employee editEmployee(
    		@PathVariable("userId") int employeeId,
    		@RequestBody Employee employee
    		) {
        return new Employee("Nathan", "Connor", "home", "(585) 222-1126", "nxc5929@rit.edu");
    }
	
	
}

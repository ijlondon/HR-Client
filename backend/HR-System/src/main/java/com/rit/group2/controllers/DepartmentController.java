package com.rit.group2.controllers;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.rit.group2.models.Department;
import com.rit.group2.models.Employee;

@RestController
@RequestMapping("/department")
@CrossOrigin(origins = "http://localhost:3000")
@EnableAutoConfiguration
public class DepartmentController {

	@RequestMapping(method = RequestMethod.POST, value = "/create")
    public Department createDepartment(@RequestBody Department department) {
        return department;
    }
	
	@RequestMapping(method = RequestMethod.GET, value = "/{departmentId}")
    public Department getDepartment(@PathVariable("departmentId") int departmentId) {
        return new Department("Software Engineering", null, null);
    }
	
	@RequestMapping(method = RequestMethod.POST, value = "/{departmentId}/edit")
    public Department editDepartment(
    		@PathVariable("departmentId") int departmentId,
    		@RequestBody Department department
    		) {
		return new Department("Software Engineering", null, null);
    }
	
	
}

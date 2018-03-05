package com.rit.group2.models;

import java.util.Set;

import javax.persistence.Entity;

@Entity
public class Department {
	
	private int id;
	
	private String name;
	
	private Employee head;

	private Set<Employee> workers;
	
	public Department(String name, Employee head, Set<Employee> workers){
		this.name = name;
		this.head = head;
		this.workers = workers;
	}
	
	public String getName() {
		return name;
	}

	public Employee getHead() {
		return head;
	}

	public Set<Employee> getWorkers() {
		return workers;
	}
}

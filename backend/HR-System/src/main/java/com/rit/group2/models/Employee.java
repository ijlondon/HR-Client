package com.rit.group2.models;

import javax.persistence.Entity;

@Entity
public class Employee {
	
	private int id;
	
	private String firstName;
	
	private String lastName;
	
	private String address;
	
	private String telephone;
	
	private String email;
	
	public Employee(String firstName, String lastName, String address, String telephone, String email){
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.telephone = telephone;
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getAddress() {
		return address;
	}

	public String getTelephone() {
		return telephone;
	}

	public String getEmail() {
		return email;
	}
}

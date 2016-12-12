package com.nik.dao;

import java.util.List;

import org.h2.engine.User;

import com.nik.model.Users;

public interface UsersDao {

	void registerUser(Users user);
	
	
	List<Users> listUsers();

	public List<Users> findFriends(String name);
	int validateUser(String name, String password);	
}

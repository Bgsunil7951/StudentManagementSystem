package in.sunil.service;


import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import in.sunil.entity.Student;
import in.sunil.entity.User;

public class CustomUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	
	private User user;
	
	public CustomUserDetails(User user)
	{
		this.user = user;
	}
	
	

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	public User getUser()
	{
		return user;
	}

}

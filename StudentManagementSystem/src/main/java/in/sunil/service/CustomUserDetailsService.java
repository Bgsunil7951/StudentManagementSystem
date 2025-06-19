package in.sunil.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import in.sunil.entity.Student;
import in.sunil.entity.User;
import in.sunil.exception.StudentException;
import in.sunil.repo.StudentRepository;
import in.sunil.repo.UserRepository;



@Service
public class CustomUserDetailsService implements UserDetailsService 
{
	
	@Autowired
	private UserRepository repo;
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	   
		User user = repo.findByEmail(username).orElse(null);
		
		if(user ==null)
		{
			throw new UsernameNotFoundException("User Not Found");
		}
		
		return new CustomUserDetails(user);
		
	}

}


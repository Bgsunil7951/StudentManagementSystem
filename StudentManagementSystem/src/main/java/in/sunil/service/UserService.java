package in.sunil.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import in.sunil.entity.User;

public interface UserService {

	  public User create(User user);
	  public User update(User user);
	  public User findById(Integer id);
	  public User findByEmail(String email);
	  public void deleteById(Integer id);
	
}

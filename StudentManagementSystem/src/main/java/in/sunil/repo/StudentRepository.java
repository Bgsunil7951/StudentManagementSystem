package in.sunil.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.sunil.entity.Student;

public interface StudentRepository  extends JpaRepository<Student, Integer>{

	public Optional<Student> findByEmail(String email);
	
}

package in.sunil.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.sunil.entity.Student;
import in.sunil.repo.StudentRepository;
import in.sunil.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService{
	
	@Autowired
	public StudentRepository repo;

	@Override
	public Student createStudent(Student s) {
		return repo.save(s);
	}

	@Override
	public List<Student> getAllStudents() {
		return repo.findAll();
	}

	@Override
	public Student getStudentById(Integer id) {
		return repo.findById(id).orElse(null);
	}

	@Override
	public Student getStudentByEmail(String email) {
		return repo.findByEmail(email).orElse(null);
	}

	@Override
	public void deleteStudent(Integer id) {
		repo.deleteById(id);
	}

	@Override
	public Student updateStudent(Integer id, Student s) {
		Student student=null;
		Optional<Student> optional = repo.findById(id);
		if(optional.isPresent()) {
			student=optional.get();
		}
		student.setId(id);
		student.setCourse(s.getCourse());
		student.setName(s.getName());
		student.setEmail(s.getEmail());
		System.out.println(student);
		return repo.save(student);
	}

}

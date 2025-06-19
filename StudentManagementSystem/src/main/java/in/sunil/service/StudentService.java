package in.sunil.service;

import java.util.List;


import in.sunil.entity.Student;

public interface StudentService {

	public Student createStudent(Student student); 
	
	public  Student updateStudent(Integer id,Student student);
	
	public List<Student> getAllStudents();
	
	public Student getStudentById(Integer id);
	
	public Student getStudentByEmail(String email); 
	
	public void deleteStudent(Integer id);



	
	
}

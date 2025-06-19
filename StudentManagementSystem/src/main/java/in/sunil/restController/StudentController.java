package in.sunil.restController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import in.sunil.entity.Student;
import in.sunil.exception.StudentException;
import in.sunil.request.StudentRegisterRequest;
import in.sunil.service.StudentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/student")
public class StudentController {

	@Autowired
	private StudentService service;
	
	@PostMapping("/public/register")
	ResponseEntity<?> studentRegister(@Valid @RequestBody StudentRegisterRequest request, BindingResult bindingResult) {

		System.out.println(request);
		
		if (bindingResult.hasErrors()) {
			throw new StudentException("Invalid Student Input", HttpStatus.BAD_REQUEST);
		}

		Student findStudent = service.getStudentByEmail(request.getEmail());

		if (findStudent != null) {
			throw new StudentException("Email ALready Exists", HttpStatus.CONFLICT);
		}

		Student student = new Student();
		student.setName(request.getName());
		student.setEmail(request.getEmail());
		student.setCourse(request.getCourse());
		
		student=service.createStudent(student);

		Map<String, Object> response = new HashMap<>();
		response.put("status", "success");
		response.put("message", "Student craeted Successfully");
		return new ResponseEntity<>(response, HttpStatus.OK);

	}
	
	@PutMapping("/secure/update/{id}")
	public ResponseEntity<?> upadetStudent(@PathVariable Integer id, 
			@Valid @RequestBody StudentRegisterRequest request,
			BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			throw new StudentException("Invalid Input data", HttpStatus.BAD_REQUEST);
		}

		 Student student = service.getStudentById(id);

		if (student == null) {
			throw new StudentException("Student Not Found", HttpStatus.NOT_FOUND);
		}

		
		student.setName(request.getName());
		student.setEmail(request.getEmail());
		student.setCourse(request.getCourse());
		
		student=service.updateStudent(id, student);

		Map<String, Object> response = new HashMap<>();
		response.put("status", "success");
		response.put("message", "Student updated Successfully");
		return new ResponseEntity<>(response, HttpStatus.OK);

	}
	
	@DeleteMapping("/secure/delete/{id}")
	public ResponseEntity<?> deleteStudent(@PathVariable Integer id)
	{

		Student student = service.getStudentById(id);
		
		if(student ==null)
		{
			throw new StudentException("Student Not Found", HttpStatus.NOT_FOUND);
		}
		
		service.deleteStudent(id);
		
		Map<String, Object> response = new HashMap<>();
		response.put("status","success");
		response.put("message","Student deleted Successfully");
		return new ResponseEntity<>(response , HttpStatus.OK);
		
	}
	@GetMapping("/secure/getAll")
	public ResponseEntity<?> getAllStudents(){
		
		List<Student> students = service.getAllStudents();
		
		Map<String, Object> response = new HashMap<>();
		response.put("status","success");
		response.put("students",students);
		return new ResponseEntity<>(response , HttpStatus.OK);
		
	}
	@GetMapping("/secure/get/{id}")
	public ResponseEntity<?> getOneStudentById(@PathVariable Integer id){
		
		Student students = service.getStudentById(id);
		
		if(students==null) {

			throw new StudentException("Student Not Found", HttpStatus.NOT_FOUND);
		}
		
		Map<String, Object> response = new HashMap<>();
		response.put("status","success");
		response.put("students",students);
		return new ResponseEntity<>(response , HttpStatus.OK);
		
	}
	
	
}

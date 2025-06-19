package in.sunil.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudentRegisterRequest {

	@NotBlank
	private String name;
	
	@NotBlank
	private String email;
	
	@NotBlank
	private String course;
}

package in.sunil.dto;

import java.util.List;


import lombok.Data;


@Data
public class UserDTO {

	private Long id;
	private String email;
	private String password;
	private String name;
}

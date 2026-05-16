package com.kirandeep.empmanagement.authentication.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdateUserStatusDto {

	private Boolean enabled;
}

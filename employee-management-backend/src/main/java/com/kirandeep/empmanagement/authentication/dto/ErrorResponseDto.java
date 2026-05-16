package com.kirandeep.empmanagement.authentication.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ErrorResponseDto {

	private String message;
	private LocalDateTime timeStamp;
}

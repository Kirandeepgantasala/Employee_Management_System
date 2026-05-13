package com.kirandeep.empmanagement.authentication.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

	private final JavaMailSender mailSender;
	@Value("${spring.mail.username}")
	private String sender;
	@Override
	public void sendEmail(String to, String subject, String body) {
		try {
			SimpleMailMessage simpleMail =new SimpleMailMessage();
			simpleMail.setFrom(sender);
			simpleMail.setTo(to);
			simpleMail.setSubject(subject);
			simpleMail.setText(body);
			mailSender.send(simpleMail);
		}
		catch(Exception e) {
			throw new RuntimeException("Unable to send email",e);
		}
		
	}

}

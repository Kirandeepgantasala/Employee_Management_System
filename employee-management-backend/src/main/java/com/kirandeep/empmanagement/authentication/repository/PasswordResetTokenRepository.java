package com.kirandeep.empmanagement.authentication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kirandeep.empmanagement.authentication.entity.PasswordResetToken;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken,Integer>{

	Optional<PasswordResetToken> findByToken(String token);
}

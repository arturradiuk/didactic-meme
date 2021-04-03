package org.wzas.didacticmeme.repository;

import org.apache.catalina.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wzas.didacticmeme.model.UserEnt;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEnt, Long> {
    Optional<UserEnt> findByEmail(String email);

    Optional<UserEnt> findByEmailAndPassword(String email, String password);
}

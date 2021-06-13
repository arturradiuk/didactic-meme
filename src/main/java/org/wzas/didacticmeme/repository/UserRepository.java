package org.wzas.didacticmeme.repository;

import org.apache.catalina.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.wzas.didacticmeme.model.UserEnt;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEnt, Long> {
    @Query("FROM users WHERE email = :email")
    Optional<UserEnt> findByEmail(String email);

    @Query("FROM users WHERE userName = :login AND password = :password")
    Optional<UserEnt> findByLoginAndPassword(String login, String password);

    Optional<UserEnt> findByUserName(String userName);
}

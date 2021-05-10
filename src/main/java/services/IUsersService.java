package services;

import entities.User;
import web.controllers.AuthenticationController;

import java.util.Optional;

public interface IUsersService {
    Optional<User> findByEmailAndPassword(String email, String password);

    void createUser(AuthenticationController.LoginData loginData);
}

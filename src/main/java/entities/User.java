package entities;

import exceptions.UserException;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class User {

    @Setter
    @Getter
    private String email;

    @Setter
    @Getter
    private String password;

    @Setter
    @Getter
    private List<Message> messages;

    @Setter
    @Getter
    private List<User> friends;


    public User(String email, String password) throws UserException {
        if(email == null || email.equals("") || email.equals(" "))
            throw new UserException("Email can't be empty");
        if(password == null || password.equals("") || password.equals(" "))
            throw new UserException("Email can't be empty");
        this.email = email;
        this.password = password;
        this.messages = new ArrayList<>();
        this.friends = new ArrayList<>();
    }
    public User (String email) {
        this.email = email;
    }



}

package entities;

import exceptions.UserException;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
public class User {

    private String email;
    private String password;
    private List<User> friends;
    private AccessLevel accessLevel;

    public User(String email, String password) throws UserException {
        if (email == null || email.equals("") || email.equals(" "))
            throw new UserException(UserException.EMPTY_EMAIL);
        if (password == null || password.equals("") || password.equals(" "))
            throw new UserException(UserException.EMPTY_PASSWORD);

        this.email = email;
        this.password = password;

        this.friends = new ArrayList<>();
    }

    public User(String email) {
        this.email = email;
    }


}

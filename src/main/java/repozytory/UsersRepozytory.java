package repozytory;

import entities.Message;
import entities.User;
import exceptions.RepozytoryException;
import exceptions.UserException;

import java.util.ArrayList;
import java.util.List;

public class UsersRepozytory {
    private List<User> users = new ArrayList<>();


    public void createUser(String email, String password) throws RepozytoryException, UserException {
        if(userExists(email))
            throw new RepozytoryException("This user already exists");

        User user = new User(email, password);
        users.add(user);

    }

    public void addUser(User user) throws RepozytoryException {
        if(userExists(user.getEmail()))
            throw new RepozytoryException("This user already exists");

        users.add(user);
    }

    public void removeUser(String email) throws RepozytoryException {
        if(!userExists(email))
            throw new RepozytoryException("This user doesn't exists");

        users.remove(getUser(email));

    }

    public User getUser(String email) throws RepozytoryException {
        for (User u:users) {
            if(u.getEmail().equals(email))
                return u;
        }
        throw new RepozytoryException("This user doesn't exists");
    }

    public List<User> getAllUsers() {
        return users;
    }

    public boolean userExists(String email) {
        for (User u:users) {
            if(u.getEmail().equals(email))
                return true;
        }
        return false;
    }

}

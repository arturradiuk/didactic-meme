package repositories;

import entities.User;
import exceptions.RepositoryException;
import exceptions.UserException;

import java.util.ArrayList;
import java.util.List;

public class UsersRepository {
    private List<User> users = new ArrayList<>();


    public void createUser(String email, String password) throws RepositoryException, UserException {
        if(userExists(email))
            throw new RepositoryException("This user already exists");

        User user = new User(email, password);
        users.add(user);

    }

    public void addUser(User user) throws RepositoryException {
        if(userExists(user.getEmail()))
            throw new RepositoryException("This user already exists");

        users.add(user);
    }

    public void removeUser(String email) throws RepositoryException {
        if(!userExists(email))
            throw new RepositoryException("This user doesn't exists");

        users.remove(getUser(email));

    }

    public User getUser(String email) throws RepositoryException {
        for (User u:users) {
            if(u.getEmail().equals(email))
                return u;
        }
        throw new RepositoryException("This user doesn't exists");
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

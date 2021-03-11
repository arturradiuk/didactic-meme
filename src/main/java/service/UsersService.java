package service;

import entities.Message;
import entities.User;
import exceptions.RepozytoryException;
import exceptions.ServiceException;
import exceptions.UserException;
import repozytory.UsersRepozytory;

import java.util.List;

public class UsersService {
    private UsersRepozytory usersRepozytory;

    public UsersService(UsersRepozytory usersRepozytory) {
        this.usersRepozytory = usersRepozytory;
    }

    public void addUser(User user) throws RepozytoryException {
        usersRepozytory.addUser(user);

    }
    public void createUser(String email, String password) throws RepozytoryException, UserException {
        usersRepozytory.createUser(email, password);
    }
    public void removeUser(String email) throws RepozytoryException {
        usersRepozytory.removeUser(email);
    }
    public void getUser(String email) throws RepozytoryException {
        usersRepozytory.getUser(email);
    }
    public List<User> getAllUsers() {
        return usersRepozytory.getAllUsers();
    }

    public List<Message> getUserMessages(String email) throws RepozytoryException {
        return usersRepozytory.getUser(email).getMessages();
    }

    public List<User> getUserFriends(String email) throws RepozytoryException {
        return usersRepozytory.getUser(email).getFriends();
    }
    public void addUserMessage(Message message, String email) throws RepozytoryException {
        usersRepozytory.getUser(email).getMessages().add(message);
    }
    public void addUserFriend(String user, String friend) throws RepozytoryException {
        usersRepozytory.getUser(user).getFriends().add(usersRepozytory.getUser(friend));
    }
}

package services;

import entities.Message;
import entities.User;
import exceptions.RepositoryException;
import exceptions.UserException;
import repositories.UsersRepository;

import java.util.List;

public class UsersService {
    private UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public void addUser(User user) throws RepositoryException {
        usersRepository.addUser(user);

    }
    public void createUser(String email, String password) throws RepositoryException, UserException {
        usersRepository.createUser(email, password);
    }
    public void removeUser(String email) throws RepositoryException {
        usersRepository.removeUser(email);
    }
    public void getUser(String email) throws RepositoryException {
        usersRepository.getUser(email);
    }
    public List<User> getAllUsers() {
        return usersRepository.getAllUsers();
    }

    public List<Message> getUserMessages(String email) throws RepositoryException {

    }

    public List<User> getUserFriends(String email) throws RepositoryException {
        return usersRepository.getUser(email).getFriends();
    }
    public void addUserMessage(Message message, String email) throws RepositoryException {
        usersRepository.getUser(email);
    }
    public void addUserFriend(String user, String friend) throws RepositoryException {
        usersRepository.getUser(user).getFriends().add(usersRepository.getUser(friend));
    }
}

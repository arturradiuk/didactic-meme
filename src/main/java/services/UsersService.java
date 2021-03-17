package services;

import entities.Message;
import entities.User;
import exceptions.RepositoryException;
import exceptions.UserException;
import repositories.UsersRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public class UsersService implements IUsersService {
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


    public List<User> getUserFriends(String email) throws RepositoryException {
        return usersRepository.getUser(email).getFriends();
    }

    public void addUserMessage(Message message, String email) throws RepositoryException {
        usersRepository.getUser(email);
    }

    public void addUserFriend(String user, String friend) throws RepositoryException {
        usersRepository.getUser(user).getFriends().add(usersRepository.getUser(friend));
    }

    @Override
    public Optional<User> findByEmailAndPassword(String email, String password) {
        // todo implement it
        return null;
    }
}

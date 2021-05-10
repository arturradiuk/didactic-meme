package exceptions;

public class UserException extends Exception {
    public final static String EMPTY_EMAIL = "Email can't be empty";
    public final static String EMPTY_PASSWORD = "Password can't be empty";

    public UserException(String message) {
        super(message);
    }
}

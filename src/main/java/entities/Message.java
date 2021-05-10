package entities;

import exceptions.MessageException;
import lombok.Data;

@Data
public class Message {

    private String content;
    private String subject;
    private boolean isRead;
    private User receiver;
    private User sender;

    public User getSender() { // in case user doesn't exist
        if (sender == null) {
            return new User("User removed");
        }
        return sender;
    }

    public Message(String content, boolean isRead, User receiver, User sender) throws MessageException {
        if (content == null || content.equals("") || content.equals(" ")) {
            throw new MessageException("Message can't be empty");
        }
        if (receiver == null) {
            throw new MessageException("Addressee can't be empty");
        }
        if (sender == null) {
            throw new MessageException("recipient can't be empty");
        }
        this.content = content;
        this.isRead = isRead;
        this.receiver = receiver;
        this.sender = sender;
    }


}

package entities;

import exceptions.MessageException;
import lombok.Getter;
import lombok.Setter;


public class Message {

    @Getter
    @Setter
    private String message;
    @Getter
    @Setter
    private boolean isRead;
    @Getter
    @Setter
    private User addressee;
    @Setter
    private User recipient;

    public User getRecipient() {
        if(recipient == null) {
            return new User("User removed");
        }
        return recipient;
    }

    public Message(String message, boolean isRead, User addressee, User recipient) throws MessageException {
        if(message == null || message.equals("") || message.equals(" ")) {
            throw new MessageException("Message can't be empty");
        }
        if( addressee == null ) {
            throw new MessageException("Addressee can't be empty");
        }
        if(recipient == null) {
            throw new MessageException("recipient can't be empty");
        }
        this.message = message;
        this.isRead = isRead;
        this.addressee = addressee;
        this.recipient = recipient;
    }


}

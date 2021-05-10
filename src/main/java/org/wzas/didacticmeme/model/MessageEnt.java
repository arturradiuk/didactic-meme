package org.wzas.didacticmeme.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity(name = "messages")
public class MessageEnt { // todo unique constraints
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @JsonIgnore
    private UUID uuid;

    @OneToOne
    @JoinColumn(name = "sender_id")
    private UserEnt sender;

    @OneToOne
    @JoinColumn(name = "receiver_id")
    private UserEnt receiver;

    private String subject;

    private String content;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean read;

}
package org.wzas.didacticmeme.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity(name = "messages")
public class MessageEnt { // todo unique constraints
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @JsonIgnore
    @Column(unique = true)
    private UUID uuid;

    @OneToOne
    @JoinColumn(name = "sender_id")
    private UserEnt sender;

    @OneToOne
    @JoinColumn(name = "receiver_id")
    private UserEnt receiver;

    private String content;

    private LocalDateTime sentTime;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean read;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MessageEnt that = (MessageEnt) o;

        return Objects.equals(id, that.id);
    }

}
package org.wzas.didacticmeme.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class UserEnt { // todo unique constraints
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private String email;
    @JsonIgnore
    private String password;

    @Column(name = "user_name", unique = true)
    private String userName;

    @Enumerated(EnumType.STRING)
    @JsonIgnore
    @Column(name = "access_level")
    private AccessLevel accessLevel = AccessLevel.ROLE_USER;

    private String avatar;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserEnt userEnt = (UserEnt) o;

        return Objects.equals(id, userEnt.id);
    }
}

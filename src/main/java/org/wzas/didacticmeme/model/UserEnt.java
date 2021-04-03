package org.wzas.didacticmeme.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity(name = "users")
public class UserEnt { // todo unique constraints
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private String email;
    @JsonIgnore
    private String password;

    @Column(name = "user_name")
    private String userName;

    @Enumerated(EnumType.STRING)
    @JsonIgnore
    @Column(name = "access_level")
    private AccessLevel accessLevel;
}

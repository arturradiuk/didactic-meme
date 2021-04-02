package org.wzas.didacticmeme.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEnt {
    private String email;
    @JsonIgnore
    private String password;

    private String userName;
    @JsonIgnore
    private AccessLevel accessLevel;
}

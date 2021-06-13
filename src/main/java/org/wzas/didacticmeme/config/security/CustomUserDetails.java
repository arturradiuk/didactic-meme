package org.wzas.didacticmeme.config.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.wzas.didacticmeme.model.UserEnt;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private String login;
    private String password;
    private Collection<? extends GrantedAuthority> grantedAuthorities;

    public static CustomUserDetails fromUserEntToCustomUserDetails(UserEnt userEnt) {
        CustomUserDetails cud = new CustomUserDetails();
        cud.login = userEnt.getUserName();
        cud.password = userEnt.getPassword();
        cud.grantedAuthorities = Collections.singletonList(new SimpleGrantedAuthority(userEnt.getAccessLevel().toString()));
        return cud;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

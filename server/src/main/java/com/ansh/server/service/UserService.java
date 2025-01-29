package com.ansh.server.service;

import com.ansh.server.entity.User;
import com.ansh.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByIpAddress(String ipAddress) {
        return userRepository.findByIpAddress(ipAddress);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User deleteUser(String username) {
        User user = userRepository.findByUsername(username);
        userRepository.delete(user);
        return user;
    }
}

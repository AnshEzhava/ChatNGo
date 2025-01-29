package com.ansh.server.repository;

import com.ansh.server.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
    User findByIpAddress(String ipAddress);
}

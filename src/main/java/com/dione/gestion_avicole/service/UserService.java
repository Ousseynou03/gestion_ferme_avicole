package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.User;
import com.dione.gestion_avicole.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface UserService {

    ResponseEntity<String> signUp(Map<String, String> requestMap);
    ResponseEntity<String> login(Map<String, String> requestMap);
    ResponseEntity<List<UserWrapper>> getAllUser();

   // ResponseEntity<String> update(Map<String, String> requestMap);

    ResponseEntity<String> updateUser(Integer userId, Map<String, String> requestMap);


    ResponseEntity<String> deleteUser(Integer id);

    ResponseEntity<String> checkToken();

    ResponseEntity<String> changePassword( Map<String,String> requestMap);

    UserDetails getAuthenticatedUser();

}

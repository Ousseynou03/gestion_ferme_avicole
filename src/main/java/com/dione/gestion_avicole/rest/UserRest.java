package com.dione.gestion_avicole.rest;

import com.dione.gestion_avicole.POJO.User;
import com.dione.gestion_avicole.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/user")
public interface UserRest {

    @PostMapping(path = "/signup")
    ResponseEntity<String> signUp(@RequestBody(required = true) Map<String,String> requestMap);

    @PostMapping("/login")
    ResponseEntity<String> login(@RequestBody Map<String, String> requestMap);

    @GetMapping("/get")
    ResponseEntity<List<UserWrapper>> getAllUser();

    @PostMapping("/update")
    ResponseEntity<String> update(@RequestBody Map<String, String> requestMap);

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteUser(@PathVariable Integer id);

    @GetMapping("/checkToken")
    ResponseEntity<String> checkToken();

    @PostMapping("/changePassword")
    ResponseEntity<String> changePassword(@RequestBody Map<String,String> requestMap);

    @GetMapping("/authenticated-user")
    ResponseEntity<UserDetails> getAuthenticatedUser();


}

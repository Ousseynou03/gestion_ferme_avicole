package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.CustomerUsersDetailsService;
import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.JWT.JwtUtil;
import com.dione.gestion_avicole.POJO.User;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.UserDao;
import com.dione.gestion_avicole.service.UserService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import com.dione.gestion_avicole.wrapper.UserWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private UserDao userDao;
    private AuthenticationManager authenticationManager;
    private CustomerUsersDetailsService customerUsersDetailsService;
    private JwtUtil jwtUtil;
    private JwtFilter jwtFilter;

    private  PasswordEncoder passwordEncoder;
    public UserServiceImpl(UserDao userDao, AuthenticationManager authenticationManager, CustomerUsersDetailsService customerUsersDetailsService, JwtUtil jwtUtil, JwtFilter jwtFilter, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.authenticationManager = authenticationManager;
        this.customerUsersDetailsService = customerUsersDetailsService;
        this.jwtUtil = jwtUtil;
        this.jwtFilter = jwtFilter;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup {}", requestMap);
        try {
            if (jwtFilter.isAdmin()){
                if (validateUserSignUp(requestMap)){
                    User user = userDao.findEmailById(requestMap.get("email"));
                    if (Objects.isNull(user)){ //Cela signifie que si nous trouvons pas d'email, seul l'objet user ici sera nul

                        userDao.save(getUserFromMap(requestMap));

                        return AvicoleUtils.getResponseEntity("Successfully Registered.", HttpStatus.CREATED);
                    }else {
                        return AvicoleUtils.getResponseEntity("Email already exist", HttpStatus.BAD_REQUEST);
                    }
                }else {
                    return AvicoleUtils.getResponseEntity(AvicoleConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
                }
            }else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
    }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //Méthode de connexion d'un user
    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
       log.info("Inside login : ", requestMap);
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password"))
        );
        if (auth.isAuthenticated()){
            if (customerUsersDetailsService.getUserDetail().getStatus().equalsIgnoreCase("true")){
                return new ResponseEntity<String>("{\"token\":\"" + jwtUtil.generateToken(
                        customerUsersDetailsService.getUserDetail().getEmail(), customerUsersDetailsService.getUserDetail().getRole())
                        + "\"}",
                        HttpStatus.OK);
            }else {
                //Demande d'autorisation à l'admin du systéme de se connecter
                return new ResponseEntity<String>("{\"message\":\"" + "Votre compte est actuellement inactif." + "\"}", HttpStatus.BAD_REQUEST);
            }
        }
       try {

       }catch (Exception ex){
           log.error("{}", ex);
       }
        return new ResponseEntity<String>("{\"message\":\"" + "Bad Credentials." + "\"}", HttpStatus.BAD_REQUEST);
    }



    //Les noms qui suivent sont obligatoires pour pouvoir valider l'enregistrement d'un utilisateur
    public boolean validateUserSignUp(Map<String, String> requestMap){
       if( requestMap.containsKey("name") && requestMap.containsKey("contactNumber")
                && requestMap.containsKey("email") && requestMap.containsKey("password")){
           return true;
       }
       return false;
    }


    private User getUserFromMap(Map<String, String> requestMap){
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setContactNumber(requestMap.get("contactNumber"));
        user.setEmail(requestMap.get("email"));
       // user.setPassword(passwordEncoder.encode(requestMap.get("password")));
        user.setPassword(passwordEncoder.encode(requestMap.get("password")));
        user.setStatus("true");
        user.setRole("user");
        return user;
    }




    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {
        try {
            if (jwtFilter.isAdmin()){
                return new ResponseEntity<>(userDao.getAllUser(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


    //Update User
    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isUser()){
                //Vérifions si l'utilisateur existe déjà
                Optional<User> optional = userDao.findById(Integer.parseInt(requestMap.get("id")));
                if (!optional.isEmpty()){
                    userDao.updateStatus(requestMap.get("status"), Integer.parseInt(requestMap.get("id")));
                    //sendMailToAllAdmin(requestMap.get("status"), optional.get().getEmail(), userDao.getAllAdmin());
                    return AvicoleUtils.getResponseEntity("User Status updated successfuly", HttpStatus.OK);
                }
            }
            else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> checkToken() {
        return AvicoleUtils.getResponseEntity("true", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try {
          User userobj = userDao.findByEmail(jwtFilter.getCurrentUser());
          if (!userobj.equals(null)){
              if (userobj.getPassword().equals(requestMap.get("oldPassword"))){
                  userobj.setPassword(requestMap.get("newPassword"));
                  userDao.save(userobj);
                  return AvicoleUtils.getResponseEntity("Mot de passe modifié avec succés", HttpStatus.OK);
              }
              return AvicoleUtils.getResponseEntity("Ancien mot de passe incorret", HttpStatus.BAD_REQUEST);
          }
          return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}

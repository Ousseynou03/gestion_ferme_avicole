package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.User;
import com.dione.gestion_avicole.wrapper.UserWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface UserDao extends JpaRepository<User, Integer> {

    //Vérifier si l'email n'existe pas deux fois
    User findEmailById(@Param("email") String email);

    //Récupération liste des users
    List<UserWrapper> getAllUser();

  //  List<UserWrapper> getAlllAdmin();


    @Transactional
    @Modifying
    Integer updateStatus(@Param("status") String status, @Param("id") Integer id);

    List<String> getAllAdmin();

    User findByEmail(String email);

    User findOneById(Integer id);
}

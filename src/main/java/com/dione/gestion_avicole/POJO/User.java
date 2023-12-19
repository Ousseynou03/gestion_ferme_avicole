package com.dione.gestion_avicole.POJO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;

@NamedQuery(name = "User.findEmailById", query = "select u from User u where u.email=:email")

//@NamedQuery(name = "User.getAllUser", query = "select new com.dione.gestion_avicole.wrapper.UserWrapper(u.id,u.name,u.email,u.contactNumber,u.role,u.status)  from User u where u.role='user'")

@NamedQuery(name = "User.updateStatus", query = "update User u set u.status=:status, u.role=:role where u.id=:id")

@NamedQuery(name = "User.getAllAdmin", query = "select u.email from User u where u.role='admin'")


@DynamicUpdate
@DynamicInsert
@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
public class User {

    private static final Long serialVersionUID=1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "contactNumber")
    private String contactNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "status")
    private String status;

    @Column(name = "role")
    private String role;


}

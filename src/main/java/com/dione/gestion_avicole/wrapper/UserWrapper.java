package com.dione.gestion_avicole.wrapper;

import com.dione.gestion_avicole.POJO.User;

public class UserWrapper {
    private Integer id;
    private String name;
    private String email;
    private String contactNumber;
    private String status;

    public UserWrapper() {
        // Constructeur par défaut
    }

    public UserWrapper(Integer id, String name, String email, String contactNumber, String status) {
        this.id = id;
        this.name = name;
        this.contactNumber = contactNumber;
        this.email = email;
        this.status = status;
    }

    // Conversion de User à UserWrapper
    public static UserWrapper fromUser(User user) {
        return new UserWrapper(user.getId(), user.getName(), user.getEmail(), user.getContactNumber(), user.getStatus());
    }

    // Conversion de UserWrapper à User
    public User toUser() {
        User user = new User();
        user.setId(this.id);
        user.setName(this.name);
        user.setEmail(this.email);
        user.setContactNumber(this.contactNumber);
        user.setStatus(this.status);
        return user;
    }

    // Getters et setters manuels
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

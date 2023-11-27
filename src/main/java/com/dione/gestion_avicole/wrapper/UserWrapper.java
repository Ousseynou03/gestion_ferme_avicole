package com.dione.gestion_avicole.wrapper;


import com.dione.gestion_avicole.POJO.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserWrapper {
    private Integer id;
    private String name;
    private String email;
    private String contactNumber;
    private String status;

    public UserWrapper(Integer id, String name,String email ,String contactNumber, String status) {
        this.id = id;
        this.name = name;
        this.contactNumber = contactNumber;
        this.email = email;
        this.status = status;
    }

    // Ajoutez cette méthode de conversion statique
    public static UserWrapper fromUser(User user) {
        return new UserWrapper(user.getId(), user.getName(), user.getEmail(), user.getContactNumber(), user.getStatus());
    }
}

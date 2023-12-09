package com.dione.gestion_avicole.POJO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@DynamicUpdate
@DynamicInsert
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Appartement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String niveau;
    private String adresse;
    private Integer nombrePieces;
    private double surface;
    private Integer loyerMensuel;


}

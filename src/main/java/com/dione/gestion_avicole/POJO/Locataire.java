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
public class Locataire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nom;
    private String prenom;
    private String adresse;
    private String email;
    private String actif;

    @ManyToOne
    @JoinColumn(name = "appartement_id_locataire")
    private Appartement appartement;




}

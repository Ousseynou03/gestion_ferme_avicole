package com.dione.gestion_avicole.POJO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;


//@NamedQuery(name = "Batiment.getAllBatiments", query = "select b from Batiment b")




@DynamicUpdate
@DynamicInsert
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Batiment {

    private static final Long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String designation;
    private String capacite;
    private String dimension;


//Un batiment à plusieurs matériels
    @OneToMany(mappedBy = "batiment")
    private List<Materiel> materiels;


    //On peut stocker plusieurs nutritions dans un batiment
    @OneToMany(mappedBy = "batiment")
    private List<Nutrition> nutritions;



    @OneToMany(mappedBy = "batiment")
    private List<PonteOueuf> ponteOueufs;

//Dans un batiment, on a plusieurs bande
    @OneToMany(mappedBy = "batiment")
    private List<Bande> bandes;

}

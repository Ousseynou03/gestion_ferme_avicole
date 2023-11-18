package com.dione.gestion_avicole.POJO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


//@NamedQuery(name = "Batiment.getAllBatiments", query = "select b from Batiment b")

@NamedQuery(name = "Batiment.countTotalBatiments", query = "SELECT  COUNT(*) FROM Batiment")



@DynamicUpdate
@DynamicInsert
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Batiment implements Serializable {

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
    @JsonIgnore
    private List<Materiel> materiels;


    //On peut stocker plusieurs nutritions dans un batiment
    @OneToMany(mappedBy = "batiment")
    @JsonIgnore
    private List<Nutrition> nutritions;



    @OneToMany(mappedBy = "batiment")
    @JsonIgnore
    private List<Oeuf> ponteOueufs;

//Dans un batiment, on a plusieurs bande
    @OneToMany(mappedBy = "batiment")
    @JsonIgnore
    private List<Bande> bandes;

}

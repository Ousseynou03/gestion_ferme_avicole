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
public class Materiel {

    private static final Long serialVersionUID=1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    private String designation;
    private double quantite;
    //Un métieriel se trouve dans un et un seul batiment
    @ManyToOne
    @JoinColumn(name = "batiment_id_materiel")
    private Batiment batiment;

//Un materiel est fournit par un seul fournisseur
    @ManyToOne
    @JoinColumn(name = "fournisseur_id_materiel")
    private Fournisseur fournisseur;



}

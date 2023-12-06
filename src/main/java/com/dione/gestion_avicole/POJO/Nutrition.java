package com.dione.gestion_avicole.POJO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@DynamicUpdate
@DynamicInsert
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Nutrition {

    private static final Long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String designation;
    private double quantite;
    private Date dateEntree;
    private Date dateSortie;
    private double quantiteSortie;
    private String epuisee;


    @ManyToOne
    @JoinColumn(name = "batiment_id_nutrition")
    private Batiment batiment;

    @ManyToOne
    @JoinColumn(name = "bande_id_nutrition")
    private Bande bande;
}

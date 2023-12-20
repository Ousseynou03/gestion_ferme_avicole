package com.dione.gestion_avicole.POJO;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@DynamicUpdate
@DynamicInsert
@Entity
public class Nutrition {

    private static final Long serialVersionUID = 1L;

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

    public Nutrition() {
    }

    public Nutrition(Integer id, String designation, double quantite, Date dateEntree, Date dateSortie, double quantiteSortie, String epuisee, Batiment batiment, Bande bande) {
        this.id = id;
        this.designation = designation;
        this.quantite = quantite;
        this.dateEntree = dateEntree;
        this.dateSortie = dateSortie;
        this.quantiteSortie = quantiteSortie;
        this.epuisee = epuisee;
        this.batiment = batiment;
        this.bande = bande;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public double getQuantite() {
        return quantite;
    }

    public void setQuantite(double quantite) {
        this.quantite = quantite;
    }

    public Date getDateEntree() {
        return dateEntree;
    }

    public void setDateEntree(Date dateEntree) {
        this.dateEntree = dateEntree;
    }

    public Date getDateSortie() {
        return dateSortie;
    }

    public void setDateSortie(Date dateSortie) {
        this.dateSortie = dateSortie;
    }

    public double getQuantiteSortie() {
        return quantiteSortie;
    }

    public void setQuantiteSortie(double quantiteSortie) {
        this.quantiteSortie = quantiteSortie;
    }

    public String getEpuisee() {
        return epuisee;
    }

    public void setEpuisee(String epuisee) {
        this.epuisee = epuisee;
    }

    public Batiment getBatiment() {
        return batiment;
    }

    public void setBatiment(Batiment batiment) {
        this.batiment = batiment;
    }

    public Bande getBande() {
        return bande;
    }

    public void setBande(Bande bande) {
        this.bande = bande;
    }
}

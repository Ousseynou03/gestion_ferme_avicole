package com.dione.gestion_avicole.POJO;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@DynamicUpdate
@DynamicInsert
@Entity
public class Materiel {

    private static final Long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    private String designation;
    private double quantite;

    @ManyToOne
    @JoinColumn(name = "batiment_id_materiel")
    private Batiment batiment;

    @ManyToOne
    @JoinColumn(name = "fournisseur_id_materiel")
    private Fournisseur fournisseur;

    public Materiel() {
    }

    public Materiel(Integer id, String designation, double quantite, Batiment batiment, Fournisseur fournisseur) {
        this.id = id;
        this.designation = designation;
        this.quantite = quantite;
        this.batiment = batiment;
        this.fournisseur = fournisseur;
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

    public Batiment getBatiment() {
        return batiment;
    }

    public void setBatiment(Batiment batiment) {
        this.batiment = batiment;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }
}

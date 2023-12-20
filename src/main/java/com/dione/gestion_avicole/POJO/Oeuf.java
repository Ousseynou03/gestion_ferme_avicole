package com.dione.gestion_avicole.POJO;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@DynamicUpdate
@DynamicInsert
@Entity
public class Oeuf {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String designation;
    private String quantite;
    private String nbrPlateau;

    @ManyToOne
    @JoinColumn(name = "batiment_id_ponte")
    private Batiment batiment;

    public Oeuf() {
    }

    public Oeuf(Integer id, String designation, String quantite, String nbrPlateau, Batiment batiment) {
        this.id = id;
        this.designation = designation;
        this.quantite = quantite;
        this.nbrPlateau = nbrPlateau;
        this.batiment = batiment;
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

    public String getQuantite() {
        return quantite;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public String getNbrPlateau() {
        return nbrPlateau;
    }

    public void setNbrPlateau(String nbrPlateau) {
        this.nbrPlateau = nbrPlateau;
    }

    public Batiment getBatiment() {
        return batiment;
    }

    public void setBatiment(Batiment batiment) {
        this.batiment = batiment;
    }
}

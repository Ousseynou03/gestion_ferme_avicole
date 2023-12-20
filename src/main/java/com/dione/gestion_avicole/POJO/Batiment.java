package com.dione.gestion_avicole.POJO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

//@NamedQuery(name = "Batiment.getAllBatiments", query = "select b from Batiment b")
@NamedQuery(name = "Batiment.countTotalBatiments", query = "SELECT  COUNT(*) FROM Batiment")
@Entity
@DynamicUpdate
@DynamicInsert
public class Batiment implements Serializable {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String designation;
    private String capacite;
    private String dimension;

    // Un batiment à plusieurs matériels
    @OneToMany(mappedBy = "batiment")
    @JsonIgnore
    private List<Materiel> materiels;

    // On peut stocker plusieurs nutritions dans un batiment
    @OneToMany(mappedBy = "batiment")
    @JsonIgnore
    private List<Nutrition> nutritions;

    @OneToMany(mappedBy = "batiment")
    @JsonIgnore
    private List<Oeuf> ponteOeufs;

    // Dans un batiment, on a plusieurs bande
    @OneToMany(mappedBy = "batiment")
    @JsonIgnore
    private List<Bande> bandes;

    public Batiment() {
    }

    public Batiment(Integer id, String code, String designation, String capacite, String dimension, List<Materiel> materiels, List<Nutrition> nutritions, List<Oeuf> ponteOeufs, List<Bande> bandes) {
        this.id = id;
        this.code = code;
        this.designation = designation;
        this.capacite = capacite;
        this.dimension = dimension;
        this.materiels = materiels;
        this.nutritions = nutritions;
        this.ponteOeufs = ponteOeufs;
        this.bandes = bandes;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getCapacite() {
        return capacite;
    }

    public void setCapacite(String capacite) {
        this.capacite = capacite;
    }

    public String getDimension() {
        return dimension;
    }

    public void setDimension(String dimension) {
        this.dimension = dimension;
    }

    public List<Materiel> getMateriels() {
        return materiels;
    }

    public void setMateriels(List<Materiel> materiels) {
        this.materiels = materiels;
    }

    public List<Nutrition> getNutritions() {
        return nutritions;
    }

    public void setNutritions(List<Nutrition> nutritions) {
        this.nutritions = nutritions;
    }

    public List<Oeuf> getPonteOeufs() {
        return ponteOeufs;
    }

    public void setPonteOeufs(List<Oeuf> ponteOeufs) {
        this.ponteOeufs = ponteOeufs;
    }

    public List<Bande> getBandes() {
        return bandes;
    }

    public void setBandes(List<Bande> bandes) {
        this.bandes = bandes;
    }
}

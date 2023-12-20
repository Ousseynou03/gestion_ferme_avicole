package com.dione.gestion_avicole.POJO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@DynamicUpdate
@DynamicInsert
@Entity
public class Fournisseur {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    private String type;
    private String nom;
    private String numTel;
    private String email;

    // Un fournisseur peut fournir plusieurs matériels
    @OneToMany(mappedBy = "fournisseur")
    @JsonIgnore
    private List<Materiel> materiels;

    public Fournisseur() {
    }

    public Fournisseur(Integer id, String type, String nom, String numTel, String email, List<Materiel> materiels) {
        this.id = id;
        this.type = type;
        this.nom = nom;
        this.numTel = numTel;
        this.email = email;
        this.materiels = materiels;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNumTel() {
        return numTel;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Materiel> getMateriels() {
        return materiels;
    }

    public void setMateriels(List<Materiel> materiels) {
        this.materiels = materiels;
    }
}

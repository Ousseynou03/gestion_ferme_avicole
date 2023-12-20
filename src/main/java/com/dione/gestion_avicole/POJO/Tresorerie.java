package com.dione.gestion_avicole.POJO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@NamedQuery(name = "Tresorerie.sommeTotaleTresorerie", query = "SELECT SUM(solde) FROM Tresorerie")

@DynamicUpdate
@DynamicInsert
@Entity
public class Tresorerie {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String type;
    private String nom;
    private String numero;
    private double solde;

    @OneToMany(mappedBy = "tresorerie")
    @JsonIgnore
    private List<Vente> ventes;

    public Tresorerie() {
    }

    public Tresorerie(Integer id, String type, String nom, String numero, double solde, List<Vente> ventes) {
        this.id = id;
        this.type = type;
        this.nom = nom;
        this.numero = numero;
        this.solde = solde;
        this.ventes = ventes;
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

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public double getSolde() {
        return solde;
    }

    public void setSolde(double solde) {
        this.solde = solde;
    }

    public List<Vente> getVentes() {
        return ventes;
    }

    public void setVentes(List<Vente> ventes) {
        this.ventes = ventes;
    }
}

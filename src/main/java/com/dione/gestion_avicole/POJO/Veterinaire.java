package com.dione.gestion_avicole.POJO;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@DynamicUpdate
@DynamicInsert
@Entity
public class Veterinaire implements Serializable {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date date;
    private String nomVeterinaire;
    private String traitement;
    private String posologie;

    @ManyToOne
    @JoinColumn(name = "bande_id_veto")
    private Bande bande;

    public Veterinaire() {
    }

    public Veterinaire(Integer id, Date date, String nomVeterinaire, String traitement, String posologie, Bande bande) {
        this.id = id;
        this.date = date;
        this.nomVeterinaire = nomVeterinaire;
        this.traitement = traitement;
        this.posologie = posologie;
        this.bande = bande;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getNomVeterinaire() {
        return nomVeterinaire;
    }

    public void setNomVeterinaire(String nomVeterinaire) {
        this.nomVeterinaire = nomVeterinaire;
    }

    public String getTraitement() {
        return traitement;
    }

    public void setTraitement(String traitement) {
        this.traitement = traitement;
    }

    public String getPosologie() {
        return posologie;
    }

    public void setPosologie(String posologie) {
        this.posologie = posologie;
    }

    public Bande getBande() {
        return bande;
    }

    public void setBande(Bande bande) {
        this.bande = bande;
    }
}

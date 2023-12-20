package com.dione.gestion_avicole.POJO;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@DynamicUpdate
@DynamicInsert
@Entity
public class Mortalite {

    private static final Long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private double effectif;
    private Date dateMortalite;
    private String description;

    @ManyToOne
    @JoinColumn(name = "bande_id_mortalite")
    private Bande bande;

    public Mortalite() {
    }

    public Mortalite(Integer id, double effectif, Date dateMortalite, String description, Bande bande) {
        this.id = id;
        this.effectif = effectif;
        this.dateMortalite = dateMortalite;
        this.description = description;
        this.bande = bande;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getEffectif() {
        return effectif;
    }

    public void setEffectif(double effectif) {
        this.effectif = effectif;
    }

    public Date getDateMortalite() {
        return dateMortalite;
    }

    public void setDateMortalite(Date dateMortalite) {
        this.dateMortalite = dateMortalite;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Bande getBande() {
        return bande;
    }

    public void setBande(Bande bande) {
        this.bande = bande;
    }
}

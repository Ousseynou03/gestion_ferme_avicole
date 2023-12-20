package com.dione.gestion_avicole.POJO;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@DynamicUpdate
@DynamicInsert
@Entity
public class Ramassage {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String observation;
    private String quantite;
    private double nbrOeufCasse;
    private double nbrOeufPerdu;
    private Date dateRamassage;

    @ManyToOne
    @JoinColumn(name = "bande_id_ramassage")
    private Bande bande;

    public Ramassage() {
    }

    public Ramassage(Integer id, String observation, String quantite, double nbrOeufCasse, double nbrOeufPerdu, Date dateRamassage, Bande bande) {
        this.id = id;
        this.observation = observation;
        this.quantite = quantite;
        this.nbrOeufCasse = nbrOeufCasse;
        this.nbrOeufPerdu = nbrOeufPerdu;
        this.dateRamassage = dateRamassage;
        this.bande = bande;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public String getQuantite() {
        return quantite;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public double getNbrOeufCasse() {
        return nbrOeufCasse;
    }

    public void setNbrOeufCasse(double nbrOeufCasse) {
        this.nbrOeufCasse = nbrOeufCasse;
    }

    public double getNbrOeufPerdu() {
        return nbrOeufPerdu;
    }

    public void setNbrOeufPerdu(double nbrOeufPerdu) {
        this.nbrOeufPerdu = nbrOeufPerdu;
    }

    public Date getDateRamassage() {
        return dateRamassage;
    }

    public void setDateRamassage(Date dateRamassage) {
        this.dateRamassage = dateRamassage;
    }

    public Bande getBande() {
        return bande;
    }

    public void setBande(Bande bande) {
        this.bande = bande;
    }
}

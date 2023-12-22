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
    private int nbrOeufCasse;
    private int nbrOeufPerdu;
    private int nbrPlateauOeuf;
    private Date dateRamassage;

    @ManyToOne
    @JoinColumn(name = "bande_id_ramassage")
    private Bande bande;

    public Ramassage() {
    }

    public Ramassage(Integer id, String observation, String quantite, int nbrOeufCasse, int nbrOeufPerdu, int nbrePlateauOeuf ,Date dateRamassage, Bande bande) {
        this.id = id;
        this.observation = observation;
        this.quantite = quantite;
        this.nbrOeufCasse = nbrOeufCasse;
        this.nbrOeufPerdu = nbrOeufPerdu;
        this.nbrPlateauOeuf = nbrPlateauOeuf;
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

    public int getNbrOeufCasse() {
        return nbrOeufCasse;
    }

    public void setNbrOeufCasse(int nbrOeufCasse) {
        this.nbrOeufCasse = nbrOeufCasse;
    }

    public int getNbrOeufPerdu() {
        return nbrOeufPerdu;
    }

    public void setNbrOeufPerdu(int nbrOeufPerdu) {
        this.nbrOeufPerdu = nbrOeufPerdu;
    }

    public Date getDateRamassage() {
        return dateRamassage;
    }

    public void setNbrPlateauOeuf(int nbrPlateauOeuf) {
        this.nbrPlateauOeuf = nbrPlateauOeuf;
    }

    public int getNbrPlateauOeuf() {
        return nbrPlateauOeuf;
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

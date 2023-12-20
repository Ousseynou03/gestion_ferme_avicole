package com.dione.gestion_avicole.POJO;

import com.dione.gestion_avicole.POJO.enums.Description;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import java.io.Serializable;

@DynamicUpdate
@DynamicInsert
@Entity
public class Vente implements Serializable {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private double quantite;
    private double prixUnitaire;
    private double montant;

    public void calculateMontant() {
        this.montant = quantite * prixUnitaire;
    }

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(30)")
    private Description description;

    @ManyToOne
    private Client client;

    @ManyToOne
    @JoinColumn(name = "bande_id_vente")
    private Bande bande;

    @ManyToOne
    @JoinColumn(name = "tresorerie_id_vente")
    private Tresorerie tresorerie;

    public Vente() {
    }

    public Vente(Integer id, double quantite, double prixUnitaire, double montant, Description description, Client client, Bande bande, Tresorerie tresorerie) {
        this.id = id;
        this.quantite = quantite;
        this.prixUnitaire = prixUnitaire;
        this.montant = montant;
        this.description = description;
        this.client = client;
        this.bande = bande;
        this.tresorerie = tresorerie;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getQuantite() {
        return quantite;
    }

    public void setQuantite(double quantite) {
        this.quantite = quantite;
    }

    public double getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(double prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }

    public Description getDescription() {
        return description;
    }

    public void setDescription(Description description) {
        this.description = description;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Bande getBande() {
        return bande;
    }

    public void setBande(Bande bande) {
        this.bande = bande;
    }

    public Tresorerie getTresorerie() {
        return tresorerie;
    }

    public void setTresorerie(Tresorerie tresorerie) {
        this.tresorerie = tresorerie;
    }
}

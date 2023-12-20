package com.dione.gestion_avicole.POJO;

import com.dione.gestion_avicole.POJO.enums.Categorie;
import com.dione.gestion_avicole.POJO.enums.Description;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@DynamicUpdate
@DynamicInsert
@Entity
public class Depense {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date dateDepense;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(30)")
    private Categorie categorie;

    private double quantite;
    private double prixUnitaire;
    private double montant;

    @PrePersist
    @PreUpdate
    public void calculateMontant() {
        this.montant = quantite * prixUnitaire;
    }

    private String description;

    @ManyToOne
    @JoinColumn(name = "bande_id_depense")
    private Bande bande;

    public Depense() {
    }

    public Depense(Integer id, Date dateDepense, Categorie categorie, double quantite, double prixUnitaire, double montant, String description, Bande bande) {
        this.id = id;
        this.dateDepense = dateDepense;
        this.categorie = categorie;
        this.quantite = quantite;
        this.prixUnitaire = prixUnitaire;
        this.montant = montant;
        this.description = description;
        this.bande = bande;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDateDepense() {
        return dateDepense;
    }

    public void setDateDepense(Date dateDepense) {
        this.dateDepense = dateDepense;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
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

package com.dione.gestion_avicole.POJO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@NamedQuery(name = "Bande.getBandeById", query = "SELECT b FROM Bande b WHERE b.id = :id")
@NamedQuery(name = "Bande.getLatestThreeBandes", query = "SELECT b FROM Bande b ORDER BY b.dateFin DESC")
@NamedQuery(name = "Bande.countTotalBande", query = "SELECT COUNT(*) FROM Bande WHERE cloture='Non'")
@Entity
@DynamicUpdate
@DynamicInsert
public class Bande implements Serializable {

    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String designation;
    private Date dateDebut;
    private Date dateFin;
    private double effectifdepart;
    private String cloture;

    @ManyToOne
    @JoinColumn(name = "batiment_id_bande")
    private Batiment batiment;

    @OneToMany(mappedBy = "bande")
    @JsonIgnore
    private List<Vente> ventes;

    @OneToMany(mappedBy = "bande")
    @JsonIgnore
    private List<Mortalite> mortalites;

    @OneToMany(mappedBy = "bande")
    @JsonIgnore
    private List<Veterinaire> veterinaires;

    public Bande() {
    }

    public Bande(Integer id, String code, String designation, Date dateDebut, Date dateFin, double effectifdepart, String cloture, Batiment batiment, List<Vente> ventes, List<Mortalite> mortalites, List<Veterinaire> veterinaires) {
        this.id = id;
        this.code = code;
        this.designation = designation;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.effectifdepart = effectifdepart;
        this.cloture = cloture;
        this.batiment = batiment;
        this.ventes = ventes;
        this.mortalites = mortalites;
        this.veterinaires = veterinaires;
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

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public double getEffectifdepart() {
        return effectifdepart;
    }

    public void setEffectifdepart(double effectifdepart) {
        this.effectifdepart = effectifdepart;
    }

    public String getCloture() {
        return cloture;
    }

    public void setCloture(String cloture) {
        this.cloture = cloture;
    }

    public Batiment getBatiment() {
        return batiment;
    }

    public void setBatiment(Batiment batiment) {
        this.batiment = batiment;
    }

    public List<Vente> getVentes() {
        return ventes;
    }

    public void setVentes(List<Vente> ventes) {
        this.ventes = ventes;
    }

    public List<Mortalite> getMortalites() {
        return mortalites;
    }

    public void setMortalites(List<Mortalite> mortalites) {
        this.mortalites = mortalites;
    }

    public List<Veterinaire> getVeterinaires() {
        return veterinaires;
    }

    public void setVeterinaires(List<Veterinaire> veterinaires) {
        this.veterinaires = veterinaires;
    }
}

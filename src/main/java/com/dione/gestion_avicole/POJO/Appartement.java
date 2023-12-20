package com.dione.gestion_avicole.POJO;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@DynamicUpdate
@DynamicInsert
@Entity
public class Appartement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String niveau;
    private String adresse;
    private Integer nombrePieces;
    private double surface;
    private Integer loyerMensuel;

    public Appartement() {
    }

    public Appartement(Integer id, String nom, String niveau, String adresse, Integer nombrePieces, double surface, Integer loyerMensuel) {
        this.id = id;
        this.nom = nom;
        this.niveau = niveau;
        this.adresse = adresse;
        this.nombrePieces = nombrePieces;
        this.surface = surface;
        this.loyerMensuel = loyerMensuel;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Integer getNombrePieces() {
        return nombrePieces;
    }

    public void setNombrePieces(Integer nombrePieces) {
        this.nombrePieces = nombrePieces;
    }

    public double getSurface() {
        return surface;
    }

    public void setSurface(double surface) {
        this.surface = surface;
    }

    public Integer getLoyerMensuel() {
        return loyerMensuel;
    }

    public void setLoyerMensuel(Integer loyerMensuel) {
        this.loyerMensuel = loyerMensuel;
    }
}

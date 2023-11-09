package com.dione.gestion_avicole.POJO;


import com.dione.gestion_avicole.POJO.enums.Description;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@DynamicUpdate
@DynamicInsert
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Vente {

    private static final Long serialVersionUID=1L;

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





}

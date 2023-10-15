package com.dione.gestion_avicole.POJO;


import com.dione.gestion_avicole.POJO.enums.Description;
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
    @PostLoad
    public void calculateMontant() {
        this.montant = quantite * prixUnitaire;
    }
    private Description description;

    @OneToMany(mappedBy = "vente")
    private List<Client> clients;


    @ManyToOne
    @JoinColumn(name = "bande_id_vente")
    private Bande bande;





}

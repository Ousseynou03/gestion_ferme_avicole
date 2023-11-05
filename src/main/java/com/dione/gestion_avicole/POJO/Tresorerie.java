package com.dione.gestion_avicole.POJO;


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
public class Tresorerie {

    private static final Long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String type;
    private String nom;
    private String numero;
    private double solde;

    @OneToMany(mappedBy = "tresorerie")
    @JsonIgnore
    private List<Vente> ventes;

}

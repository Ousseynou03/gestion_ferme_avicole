package com.dione.gestion_avicole.POJO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@DynamicUpdate
@DynamicInsert
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Bande {

    private static final Long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String designation;
    private Date dateDebut;
    private Date dateFin;
    private String effectifdepart;


    @ManyToOne
    @JoinColumn(name = "batiment_id_bande")
    private Batiment batiment;

    @OneToMany(mappedBy = "bande")
    private List<Vente> ventes;

    @OneToMany(mappedBy = "bande")
    private List<Mortalite> mortalites;

    @OneToMany(mappedBy = "bande")
    private List<Veterinaire> veterinaires;

}

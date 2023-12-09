package com.dione.gestion_avicole.POJO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@DynamicUpdate
@DynamicInsert
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ContratLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;



    @ManyToOne
    @JoinColumn(name = "locataire_id_conrat")
    private Locataire locataire;

    @Temporal(TemporalType.DATE)
    private Date dateDebut;

    @Temporal(TemporalType.DATE)
    private Date dateFin;
}

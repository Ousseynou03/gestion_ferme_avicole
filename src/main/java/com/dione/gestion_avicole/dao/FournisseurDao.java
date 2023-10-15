package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FournisseurDao extends JpaRepository<Fournisseur,Integer> {
}

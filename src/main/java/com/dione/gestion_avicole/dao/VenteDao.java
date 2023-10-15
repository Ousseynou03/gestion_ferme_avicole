package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Vente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenteDao extends JpaRepository<Vente,Integer> {
}

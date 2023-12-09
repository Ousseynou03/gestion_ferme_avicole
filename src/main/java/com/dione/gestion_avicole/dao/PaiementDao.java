package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaiementDao extends JpaRepository<Paiement,Integer> {
}

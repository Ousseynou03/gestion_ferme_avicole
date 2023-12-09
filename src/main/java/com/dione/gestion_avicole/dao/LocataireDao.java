package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Locataire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocataireDao extends JpaRepository<Locataire,Integer> {
}

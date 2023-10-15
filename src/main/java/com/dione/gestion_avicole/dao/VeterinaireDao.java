package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Veterinaire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeterinaireDao extends JpaRepository<Veterinaire,Integer> {
}

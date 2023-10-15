package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Materiel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterielDao extends JpaRepository<Materiel,Integer> {
}

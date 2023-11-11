package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Oeuf;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PonteOeufDao extends JpaRepository<Oeuf,Integer> {
}

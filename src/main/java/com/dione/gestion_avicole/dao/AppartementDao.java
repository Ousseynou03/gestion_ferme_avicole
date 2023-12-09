package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Appartement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppartementDao extends JpaRepository<Appartement,Integer> {
}

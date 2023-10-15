package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Mortalite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MortaliteDao extends JpaRepository<Mortalite,Integer> {
}

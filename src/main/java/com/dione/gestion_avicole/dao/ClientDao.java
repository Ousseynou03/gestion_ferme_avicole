package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientDao extends JpaRepository<Client,Integer> {
}

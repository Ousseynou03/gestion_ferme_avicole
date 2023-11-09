package com.dione.gestion_avicole.service;

import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Client;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ClientService {

    ResponseEntity<String> ajoutClient(Map<String, String> requestMap);

    ResponseEntity<List<Client>> getAllClient();

    ResponseEntity<String> updateClient(Map<String, String> requestMap);

    ResponseEntity<String> deleteClient(Integer id);
}

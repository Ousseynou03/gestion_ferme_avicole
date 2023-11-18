package com.dione.gestion_avicole.serviceImpl;


import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Client;
import com.dione.gestion_avicole.POJO.Tresorerie;
import com.dione.gestion_avicole.POJO.Vente;
import com.dione.gestion_avicole.POJO.enums.Description;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BandeDao;
import com.dione.gestion_avicole.dao.ClientDao;
import com.dione.gestion_avicole.dao.TresorerieDao;
import com.dione.gestion_avicole.dao.VenteDao;
import com.dione.gestion_avicole.service.VenteService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VenteServiceImpl implements VenteService {

    private VenteDao venteDao;
    private JwtFilter jwtFilter;
    private BandeDao bandeDao;
    private ClientDao clientDao;
    private TresorerieDao tresorerieDao;

    public VenteServiceImpl(VenteDao venteDao, JwtFilter jwtFilter, BandeDao bandeDao, ClientDao clientDao, TresorerieDao tresorerieDao) {
        this.venteDao = venteDao;
        this.jwtFilter = jwtFilter;
        this.bandeDao = bandeDao;
        this.clientDao = clientDao;
        this.tresorerieDao = tresorerieDao;
    }

    @Override
    public ResponseEntity<String> ajoutVente(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateVenteMap(requestMap, false)) {
                    Vente vente = getVentesFromMap(requestMap, false);
                    if (vente.getClient() == null) {
                        return AvicoleUtils.getResponseEntity("Le Client id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    venteDao.save(vente);
                    return AvicoleUtils.getResponseEntity("Vente ajoutée avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Vente getVentesFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Vente vente = new Vente();
        if (isAdd) {
            vente.setId(Integer.parseInt(requestMap.get("id")));
        }

        vente.setDescription(Description.valueOf((requestMap.get("description"))));

        // Validation et ajout de quantite
        if (requestMap.containsKey("quantite") && requestMap.containsKey("prixUnitaire")) {
            try {
                double quantite = Double.parseDouble(requestMap.get("quantite"));
                double prixUnitaire = Double.parseDouble(requestMap.get("prixUnitaire"));
                vente.setQuantite(quantite);
                vente.setPrixUnitaire(prixUnitaire);
                vente.calculateMontant();
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }

        if (requestMap.containsKey("client") && requestMap.containsKey("bande") && requestMap.containsKey("tresorerie")) {
            try {
                Integer clientId = Integer.parseInt(requestMap.get("client"));
                Integer bandeId = Integer.parseInt(requestMap.get("bande"));
                Integer tresorerieId = Integer.parseInt(requestMap.get("tresorerie"));
                Client client = clientDao.findById(clientId).orElse(null);
                Bande bande = bandeDao.findById(bandeId).orElse(null);
                Tresorerie tresorerie = tresorerieDao.findById(tresorerieId).orElse(null);
                vente.setClient(client);
                vente.setBande(bande);
                vente.setTresorerie(tresorerie);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return vente;
    }

    private boolean validateVenteMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("client") && requestMap.containsKey("bande")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }
    @Override
    public ResponseEntity<List<Vente>> getAllVente() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                return new ResponseEntity<List<Vente>>(venteDao.findAll(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateVente(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateVenteMap(requestMap, true)){
                    Optional optional = venteDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        venteDao.save(getVentesFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Vente modifiée avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Vente id dosen't exist", HttpStatus.OK);
                    }
                }
                return AvicoleUtils.getResponseEntity(AvicoleConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteVente(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = venteDao.findById(id);
                if (!optional.isEmpty()){
                    venteDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Vente avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Vente id dosen't existe", HttpStatus.OK);
                }

            }else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public Integer sommeTotalVentePoulet() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return venteDao.sommeTotalVentePoulet();
            }
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage de la somme des ventes de Poulet.", ex);
        }
        return null;
    }

    @Override
    public Integer sommeTotalVenteOeuf() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return venteDao.sommeTotalVenteOeuf();
            }
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage de la somme des ventes d'oeuf.", ex);
        }
        return null;
    }



}

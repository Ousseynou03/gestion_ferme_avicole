package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Locataire;
import com.dione.gestion_avicole.POJO.Paiement;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.LocataireDao;
import com.dione.gestion_avicole.dao.PaiementDao;
import com.dione.gestion_avicole.service.PaiementService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaiementServiceImpl implements PaiementService {

    private PaiementDao paiementDao;
    private LocataireDao locataireDao;
    private JwtFilter jwtFilter;

    public PaiementServiceImpl(PaiementDao paiementDao, LocataireDao locataireDao, JwtFilter jwtFilter) {
        this.paiementDao = paiementDao;
        this.locataireDao = locataireDao;
        this.jwtFilter = jwtFilter;
    }

    @Override
    public ResponseEntity<String> ajoutPaiement(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validatePaiementMap(requestMap, false)) {
                    Paiement paiement = getPaiementsFromMap(requestMap, false);
                    if (paiement.getLocataire() == null) {
                        return AvicoleUtils.getResponseEntity("Le Paiement id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    paiementDao.save(paiement);
                    return AvicoleUtils.getResponseEntity("Paiement ajouté avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Paiement getPaiementsFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Paiement paiement = new Paiement();
        if (isAdd) {
            paiement.setId(Integer.parseInt(requestMap.get("id")));
        }

        // Validation et ajout de montant
        if (requestMap.containsKey("montant")) {
            try {
                double montant = Double.parseDouble(requestMap.get("montant"));
                paiement.setMontant(montant);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }

        // Ajout de la datePaiement
        if (requestMap.containsKey("datePaiement")) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date datePaiement = dateFormat.parse(requestMap.get("datePaiement"));
                paiement.setDatePaiement(datePaiement);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // Validation et ajout de l'id d'un locataire
        if (requestMap.containsKey("locataire")) {
            try {
                Integer locataireId = Integer.parseInt(requestMap.get("locataire"));
                Locataire locataireFromDB = locataireDao.findById(locataireId).orElse(null);

                if (locataireFromDB == null) {
                    throw new IllegalArgumentException("Le Paiement avec l'ID spécifié n'existe pas.");
                }

                paiement.setLocataire(locataireFromDB);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        } else {
            throw new IllegalArgumentException("L'identifiant du pairment est obligatoire.");
        }
        return paiement;
    }


    private boolean validatePaiementMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("montant") && requestMap.containsKey("datePaiement")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<Paiement>> getAllPaiement() {
        try {
            return new ResponseEntity<List<Paiement>>(paiementDao.findAll(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updatePaiement(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()){
                if (validatePaiementMap(requestMap, true)){
                    Optional optional = paiementDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        paiementDao.save(getPaiementsFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Paiement modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Paiement id dosen't exist", HttpStatus.OK);
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
    public ResponseEntity<String> deletePaiement(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = paiementDao.findById(id);
                if (!optional.isEmpty()){
                    paiementDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Paiement avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Paiement id dosen't existe", HttpStatus.OK);
                }

            }else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

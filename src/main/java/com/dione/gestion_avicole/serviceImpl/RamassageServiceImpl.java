package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Oeuf;
import com.dione.gestion_avicole.POJO.Ramassage;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BandeDao;
import com.dione.gestion_avicole.dao.RamassageDao;
import com.dione.gestion_avicole.service.RamassageService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
//import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


@Service
//@Slf4j
public class RamassageServiceImpl implements RamassageService {

    private final RamassageDao ramassageDao;
    private final BandeDao bandeDao;
    private final JwtFilter jwtFilter;

    public RamassageServiceImpl(RamassageDao ramassageDao, BandeDao bandeDao, JwtFilter jwtFilter) {
        this.ramassageDao = ramassageDao;
        this.bandeDao = bandeDao;
        this.jwtFilter = jwtFilter;
    }


    @Override
    public ResponseEntity<String> ajoutRamassage(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateRamassageMap(requestMap, false)) {
                    Ramassage ramassage = getRamassagesFromMap(requestMap, false);
                    if (ramassage.getBande() == null) {
                        return AvicoleUtils.getResponseEntity("Le Ramassage id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    ramassageDao.save(ramassage);
                    return AvicoleUtils.getResponseEntity("Ramassage ajouté avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private Ramassage getRamassagesFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Ramassage ramassage = new Ramassage();
        if (isAdd) {
            ramassage.setId(Integer.parseInt(requestMap.get("id")));
        }
        ramassage.setObservation(requestMap.get("observation"));
        ramassage.setQuantite(requestMap.get("quantite"));

        // Ajout de la dateRamassage
        if (requestMap.containsKey("dateRamassage")) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date dateRamassage = dateFormat.parse(requestMap.get("dateRamassage"));
                ramassage.setDateRamassage(dateRamassage);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // Validation et ajout de nbrOeufCasse
        if (requestMap.containsKey("nbrOeufPerdu")) {
            try {
                double nbrOeufPerdu = Double.parseDouble(requestMap.get("nbrOeufPerdu"));
                ramassage.setNbrOeufPerdu(nbrOeufPerdu);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }

        // Validation et ajout de nbrOeufCasse
        if (requestMap.containsKey("nbrOeufCasse")) {
            try {
                double nbrOeufCasse = Double.parseDouble(requestMap.get("nbrOeufCasse"));
                ramassage.setNbrOeufCasse(nbrOeufCasse);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }

        // Validation et ajout de l'id de la bande
        if (requestMap.containsKey("bande")) {
            try {
                Integer bandeId = Integer.parseInt(requestMap.get("bande"));
                Bande bandeFromDB = bandeDao.findById(bandeId).orElse(null);

                if (bandeFromDB == null) {
                    throw new IllegalArgumentException("La Bande avec l'ID spécifié n'existe pas.");
                }

                ramassage.setBande(bandeFromDB);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        } else {
            throw new IllegalArgumentException("L'identifiant de la bande est obligatoire.");
        }
        return ramassage;
    }

    private boolean validateRamassageMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("observation")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }


    @Override
    public ResponseEntity<List<Ramassage>> getAllRamassage() {
        try {
            return new ResponseEntity<List<Ramassage>>(ramassageDao.findAll(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateRamassage(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateRamassageMap(requestMap, true)){
                    Optional optional = ramassageDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        ramassageDao.save(getRamassagesFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Ramassage modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Ramassage id dosen't exist", HttpStatus.OK);
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
    }*/

    @Override
    public ResponseEntity<String> updateRamassage(Integer ramassageId, Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateRamassageMap(requestMap, true)){
                    Optional<Ramassage> optional = ramassageDao.findById(ramassageId);
                    if (optional.isPresent()){
                        Ramassage ramassageToUpdate = getRamassagesFromMap(requestMap, true);
                        ramassageToUpdate.setId(ramassageId); // Set the ID before saving
                        ramassageDao.save(ramassageToUpdate);
                        return AvicoleUtils.getResponseEntity("Ramassage modifié avec succès", HttpStatus.OK);
                    } else {
                        return AvicoleUtils.getResponseEntity("Ramassage ID n'existe pas", HttpStatus.OK);
                    }
                }
                return AvicoleUtils.getResponseEntity(AvicoleConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> deleteRamassage(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = ramassageDao.findById(id);
                if (!optional.isEmpty()){
                    ramassageDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Ramassage avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Ramassage id dosen't existe", HttpStatus.OK);
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
    public Integer nbreTotalOeufRamassage() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return ramassageDao.nbreTotalOeufRamassage();
            }
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des ramassages.", ex);
        }
        return null;
    }

    @Override
    public Integer NbreOeufPerdu() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return ramassageDao.NbreOeufPerdu();
            }
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage de ramassages des oeufs perdus.", ex);
        }
        return null;
    }

    @Override
    public Integer totalOeuf() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return ramassageDao.totalOeuf();
            }
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des oeufs totaux.", ex);
        }
        return null;
    }


}

package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Appartement;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Locataire;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.AppartementDao;
import com.dione.gestion_avicole.dao.LocataireDao;
import com.dione.gestion_avicole.service.LocataireService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class LocataireServiceImpl implements LocataireService {

    private LocataireDao locataireDao;
    private AppartementDao appartementDao;
    private JwtFilter jwtFilter;

    public LocataireServiceImpl(LocataireDao locataireDao, AppartementDao appartementDao, JwtFilter jwtFilter) {
        this.locataireDao = locataireDao;
        this.appartementDao = appartementDao;
        this.jwtFilter = jwtFilter;
    }

    @Override
    public ResponseEntity<String> ajoutLocataire(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateLocataireMap(requestMap, false)) {
                    Locataire locataire = getLocatairesFromMap(requestMap, false);
                    if (locataire.getAppartement() == null) {
                        return AvicoleUtils.getResponseEntity("Le Locataire id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    locataireDao.save(locataire);
                    return AvicoleUtils.getResponseEntity("Locataire ajouté avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Locataire getLocatairesFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Locataire locataire = new Locataire();
        if (isAdd) {
            locataire.setId(Integer.parseInt(requestMap.get("id")));
        }
        locataire.setAdresse(requestMap.get("adresse"));
        locataire.setPrenom(requestMap.get("prenom"));
        locataire.setNom(requestMap.get("nom"));
        locataire.setEmail(requestMap.get("email"));
        locataire.setActif("Oui");

        // Validation et ajout de l'id d'un appartement
        if (requestMap.containsKey("appartement")) {
            try {
                Integer appartementId = Integer.parseInt(requestMap.get("appartement"));
                Appartement appartementFromDB = appartementDao.findById(appartementId).orElse(null);

                if (appartementFromDB == null) {
                    throw new IllegalArgumentException("Le Locataire avec l'ID spécifié n'existe pas.");
                }

                locataire.setAppartement(appartementFromDB);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        } else {
            throw new IllegalArgumentException("L'identifiant d'un locataire est obligatoire.");
        }
        return locataire;
    }


    private boolean validateLocataireMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("nom")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<Locataire>> getAllLocataire() {
        try {
            return new ResponseEntity<List<Locataire>>(locataireDao.findAll(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateLocataire(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()){
                if (validateLocataireMap(requestMap, true)){
                    Optional optional = locataireDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        locataireDao.save(getLocatairesFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Locataire modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Locataire id dosen't exist", HttpStatus.OK);
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
    public ResponseEntity<String> deleteLocataire(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = locataireDao.findById(id);
                if (!optional.isEmpty()){
                    locataireDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Locataire avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Locataire id dosen't existe", HttpStatus.OK);
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

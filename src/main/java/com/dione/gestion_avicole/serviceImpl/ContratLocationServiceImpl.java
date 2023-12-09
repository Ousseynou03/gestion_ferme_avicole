package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.*;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.ContratLocationDao;
import com.dione.gestion_avicole.dao.LocataireDao;
import com.dione.gestion_avicole.service.ContratLocationService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


@Service
public class ContratLocationServiceImpl implements ContratLocationService {

    private ContratLocationDao contratLocationDao;
    private JwtFilter jwtFilter;

    private LocataireDao locataireDao;

    public ContratLocationServiceImpl(ContratLocationDao contratLocationDao, JwtFilter jwtFilter, LocataireDao locataireDao) {
        this.contratLocationDao = contratLocationDao;
        this.jwtFilter = jwtFilter;
        this.locataireDao = locataireDao;
    }

    @Override
    public ResponseEntity<String> ajoutContratLocation(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateContrtatLocationMap(requestMap, false)) {
                    ContratLocation contratLocation = getContratLocationsFromMap(requestMap, false);
                    if (contratLocation.getLocataire() == null) {
                        return AvicoleUtils.getResponseEntity("Le Contrat id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    contratLocationDao.save(contratLocation);
                    return AvicoleUtils.getResponseEntity("Contrat ajouté avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ContratLocation getContratLocationsFromMap(Map<String, String> requestMap, Boolean isAdd) {
        ContratLocation contratLocation = new ContratLocation();
        if (isAdd) {
            contratLocation.setId(Integer.parseInt(requestMap.get("id")));
        }


        // Ajout de la dateDebut et dateFin
        if (requestMap.containsKey("dateDebut") && requestMap.containsKey("dateFin")) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date dateDebut = dateFormat.parse(requestMap.get("dateDebut"));
                Date dateFin = dateFormat.parse(requestMap.get("dateFin"));
                contratLocation.setDateDebut(dateDebut);
                contratLocation.setDateFin(dateFin);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // Validation et ajout de l'id du locataire
        if (requestMap.containsKey("locataire")) {
            try {
                Integer locataireId = Integer.parseInt(requestMap.get("locataire"));

                // Charger le Batiment depuis la base de données
                Locataire locataireFromDB = locataireDao.findById(locataireId).orElse(null);

                if (locataireFromDB == null) {
                    throw new IllegalArgumentException("Le Contrat avec l'ID spécifié n'existe pas.");
                }

                contratLocation.setLocataire(locataireFromDB);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        } else {
            throw new IllegalArgumentException("L'identifiant du locataire est obligatoire.");
        }
        return contratLocation;
    }


    private boolean validateContrtatLocationMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("locataire")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<ContratLocation>> getAllContratLocation() {
        try {
            if (jwtFilter.isAdmin()) {
                return new ResponseEntity<List<ContratLocation>>(contratLocationDao.findAll(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateContratLocation(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {

                Optional optional = contratLocationDao.findById(Integer.parseInt(requestMap.get("id")));
                if (!optional.isEmpty()) {
                    contratLocationDao.save(getContratLocationsFromMap(requestMap, true));
                    return AvicoleUtils.getResponseEntity("Contrat modifié avec succés", HttpStatus.OK);
                } else {
                    return AvicoleUtils.getResponseEntity("Contrat id dosen't exist", HttpStatus.OK);
                }

            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteContratLocation(Integer id) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional optional = contratLocationDao.findById(id);
                if (!optional.isEmpty()) {
                    contratLocationDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Contrat avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                } else {
                    return AvicoleUtils.getResponseEntity("Contrat id dosen't existe", HttpStatus.NO_CONTENT);
                }

            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

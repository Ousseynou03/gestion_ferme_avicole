package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Appartement;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Mortalite;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.AppartementDao;
import com.dione.gestion_avicole.service.AppartementService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AppartementServiceImpl implements AppartementService {

    private final AppartementDao appartementDao;
    private final JwtFilter jwtFilter;

    public AppartementServiceImpl(AppartementDao appartementDao, JwtFilter jwtFilter) {
        this.appartementDao = appartementDao;
        this.jwtFilter = jwtFilter;
    }



    @Override
    public ResponseEntity<String> ajoutAppartement(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                    appartementDao.save(getAppartementsFromMap(requestMap, false));
                    return AvicoleUtils.getResponseEntity("Appartement ajouté avec succés", HttpStatus.OK);
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private Appartement getAppartementsFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Appartement appartement = new Appartement();
        if (isAdd) {
            appartement.setId(Integer.parseInt(requestMap.get("id")));

        }

        if (requestMap.containsKey("nombrePieces")) {
            appartement.setNombrePieces(Integer.parseInt(requestMap.get("nombrePieces")));
        }
        if (requestMap.containsKey("loyerMensuel")) {
            appartement.setLoyerMensuel(Integer.parseInt(requestMap.get("loyerMensuel")));
        }

        appartement.setAdresse(requestMap.get("adresse"));
        appartement.setNom(requestMap.get("nom"));
        appartement.setNiveau(requestMap.get("niveau"));

        // Validation et ajout de surface
        if (requestMap.containsKey("surface")) {
            try {
                double surface = Double.parseDouble(requestMap.get("surface"));
                appartement.setSurface(surface);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }
        return appartement;

    }


    @Override
    public ResponseEntity<List<Appartement>> getAllAppartement() {
        try {
            if (jwtFilter.isAdmin()) {
                return new ResponseEntity<List<Appartement>>(appartementDao.findAll(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateAppartement(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {

                    Optional optional = appartementDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()) {
                        appartementDao.save(getAppartementsFromMap(requestMap, true));
                        return AvicoleUtils.getResponseEntity("Appartement modifié avec succés", HttpStatus.OK);
                    } else {
                        return AvicoleUtils.getResponseEntity("Appartement id dosen't exist", HttpStatus.OK);
                    }

            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }*/
@Override
public ResponseEntity<String> updateAppartement(Integer appartementId, Map<String, String> requestMap) {
    try {
        if (jwtFilter.isAdmin()) {
            Optional<Appartement> optional = appartementDao.findById(appartementId);
            if (optional.isPresent()) {
                Appartement appartementToUpdate = getAppartementsFromMap(requestMap, true);
                appartementToUpdate.setId(appartementId); // Set the ID before saving
                appartementDao.save(appartementToUpdate);
                return AvicoleUtils.getResponseEntity("Appartement modifié avec succès", HttpStatus.OK);
            } else {
                return AvicoleUtils.getResponseEntity("Appartement ID n'existe pas", HttpStatus.OK);
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
    public ResponseEntity<String> deleteAppartement(Integer id) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional optional = appartementDao.findById(id);
                if (!optional.isEmpty()) {
                    appartementDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Appartement avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                } else {
                    return AvicoleUtils.getResponseEntity("Appartement id dosen't existe", HttpStatus.NO_CONTENT);
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

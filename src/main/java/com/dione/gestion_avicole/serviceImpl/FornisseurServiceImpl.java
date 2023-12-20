package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Fournisseur;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.FournisseurDao;
import com.dione.gestion_avicole.service.FournisseurService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
//import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
//@Slf4j
public class FornisseurServiceImpl implements FournisseurService {

    private final FournisseurDao fournisseurDao;
    private final JwtFilter jwtFilter;

    public FornisseurServiceImpl(FournisseurDao fournisseurDao, JwtFilter jwtFilter) {
        this.fournisseurDao = fournisseurDao;
        this.jwtFilter = jwtFilter;
    }

    @Override
    public ResponseEntity<String> ajoutFournisseur(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateFournisseurMap(requestMap, false)) {
                    fournisseurDao.save(getFournisseurFromMap(requestMap, false));
                    return AvicoleUtils.getResponseEntity("Fournisseur ajouté avec succés", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private Fournisseur getFournisseurFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Fournisseur fournisseur = new Fournisseur();
        if (isAdd){
            fournisseur.setId(Integer.parseInt(requestMap.get("id")));
        }
        fournisseur.setNom(requestMap.get("nom"));
        fournisseur.setType(requestMap.get("type"));
        fournisseur.setEmail(requestMap.get("email"));
        fournisseur.setNumTel(requestMap.get("numTel"));
        return fournisseur;
    }
    private boolean validateFournisseurMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("type")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<Fournisseur>> getAllFournisseur() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                return new ResponseEntity<List<Fournisseur>>(fournisseurDao.findAll(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateFournisseur(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateFournisseurMap(requestMap, true)){
                    Optional optional = fournisseurDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        fournisseurDao.save(getFournisseurFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Fournisseur modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Fournisseur id dosen't exist", HttpStatus.OK);
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
    public ResponseEntity<String> updateFournisseur(Integer fournisseurId, Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateFournisseurMap(requestMap, true)){
                    Optional<Fournisseur> optional = fournisseurDao.findById(fournisseurId);
                    if (optional.isPresent()){
                        Fournisseur fournisseurToUpdate = getFournisseurFromMap(requestMap, true);
                        fournisseurToUpdate.setId(fournisseurId); // Set the ID before saving
                        fournisseurDao.save(fournisseurToUpdate);
                        return AvicoleUtils.getResponseEntity("Fournisseur modifié avec succès", HttpStatus.OK);
                    } else {
                        return AvicoleUtils.getResponseEntity("Fournisseur ID doesn't exist", HttpStatus.OK);
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
    public ResponseEntity<String> deleteFournisseur(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = fournisseurDao.findById(id);
                if (!optional.isEmpty()){
                    fournisseurDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Fournisseur avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Fournisseur id dosen't existe", HttpStatus.OK);
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

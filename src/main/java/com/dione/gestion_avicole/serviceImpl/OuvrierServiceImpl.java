package com.dione.gestion_avicole.serviceImpl;


import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Ouvrier;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.OuvrierDao;
import com.dione.gestion_avicole.service.OuvrierSerice;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class OuvrierServiceImpl implements OuvrierSerice {

    private final OuvrierDao ouvrierDao;
    private final JwtFilter jwtFilter;

    public OuvrierServiceImpl(OuvrierDao ouvrierDao, JwtFilter jwtFilter) {
        this.ouvrierDao = ouvrierDao;
        this.jwtFilter = jwtFilter;
    }

    @Override
    public ResponseEntity<String> ajoutOuvrier(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateOuvrierMap(requestMap, false)) {
                    ouvrierDao.save(getOuvrierFromMap(requestMap, false));
                    return AvicoleUtils.getResponseEntity("Ouvrier ajouté avec succés", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Ouvrier getOuvrierFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Ouvrier ouvrier = new Ouvrier();
        if (isAdd){
            ouvrier.setId(Integer.parseInt(requestMap.get("id")));
        }
        ouvrier.setNom(requestMap.get("nom"));
        ouvrier.setFonction(requestMap.get("fonction"));
        ouvrier.setNumTel(requestMap.get("numTel"));
        ouvrier.setVille(requestMap.get("ville"));
        if (requestMap.containsKey("salaire")) {
            try {
                double salaire = Double.parseDouble(requestMap.get("salaire"));
                ouvrier.setSalaire(salaire);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }
        return ouvrier;
    }

    private boolean validateOuvrierMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("nom") && requestMap.containsKey("fonction")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }
    @Override
    public ResponseEntity<List<Ouvrier>> getAllOuvrier() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                return new ResponseEntity<List<Ouvrier>>(ouvrierDao.findAll(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateOuvrier(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()){
                if (validateOuvrierMap(requestMap, true)){
                    Optional optional = ouvrierDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        ouvrierDao.save(getOuvrierFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Ouvrier modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Ouvrier id n'existe pas", HttpStatus.OK);
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
    public ResponseEntity<String> updateOuvrier(Integer ouvrierId, Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()){
                if (validateOuvrierMap(requestMap, true)){
                    Optional<Ouvrier> optional = ouvrierDao.findById(ouvrierId);
                    if (optional.isPresent()){
                        Ouvrier ouvrierToUpdate = getOuvrierFromMap(requestMap, true);
                        ouvrierToUpdate.setId(ouvrierId); // Set the ID before saving
                        ouvrierDao.save(ouvrierToUpdate);
                        return AvicoleUtils.getResponseEntity("Ouvrier modifié avec succès", HttpStatus.OK);
                    } else {
                        return AvicoleUtils.getResponseEntity("Ouvrier ID n'existe pas", HttpStatus.OK);
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
    public ResponseEntity<String> deleteOuvrier(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = ouvrierDao.findById(id);
                if (!optional.isEmpty()){
                    ouvrierDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Ouvrier avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Ouvrier id dosen't existe", HttpStatus.OK);
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

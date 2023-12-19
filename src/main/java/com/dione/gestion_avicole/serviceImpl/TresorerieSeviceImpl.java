package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Tresorerie;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.TresorerieDao;
import com.dione.gestion_avicole.service.TresorerieService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TresorerieSeviceImpl implements TresorerieService {


    private final TresorerieDao tresorerieDao;

    private final JwtFilter jwtFilter;

    public TresorerieSeviceImpl(TresorerieDao tresorerieDao, JwtFilter jwtFilter) {
        this.tresorerieDao = tresorerieDao;
        this.jwtFilter = jwtFilter;
    }


    @Override
    public ResponseEntity<String> ajoutTresorerie(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateTresorerieMap(requestMap, false)) {
                    tresorerieDao.save(getTresoreriesFromMap(requestMap, false));
                    return AvicoleUtils.getResponseEntity("solde ajouté avec succés", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Tresorerie getTresoreriesFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Tresorerie tresorerie = new Tresorerie();
        if (isAdd){
            tresorerie.setId(Integer.parseInt(requestMap.get("id")));
        }
        tresorerie.setNom(requestMap.get("nom"));
        tresorerie.setType(requestMap.get("type"));
        tresorerie.setNumero(requestMap.get("numero"));
        if (requestMap.containsKey("solde")) {
            try {
                double solde = Double.parseDouble(requestMap.get("solde"));
                tresorerie.setSolde(solde);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }
        return tresorerie;
    }
    private boolean validateTresorerieMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("nom") && requestMap.containsKey("type")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<Tresorerie>> getAllTresorerie() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                return new ResponseEntity<List<Tresorerie>>(tresorerieDao.findAll(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateTresorerie(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()){
                if (validateTresorerieMap(requestMap, true)){
                    Optional optional = tresorerieDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        tresorerieDao.save(getTresoreriesFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Solde modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Solde id dosen't exist", HttpStatus.OK);
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
public ResponseEntity<String> updateTresorerie(Integer tresorerieId, Map<String, String> requestMap) {
    try {
        if (jwtFilter.isAdmin()){
            if (validateTresorerieMap(requestMap, true)){
                Optional<Tresorerie> optional = tresorerieDao.findById(tresorerieId);
                if (optional.isPresent()){
                    Tresorerie tresorerieToUpdate = getTresoreriesFromMap(requestMap, true);
                    tresorerieToUpdate.setId(tresorerieId); // Set the ID before saving
                    tresorerieDao.save(tresorerieToUpdate);
                    return AvicoleUtils.getResponseEntity("Solde modifié avec succès", HttpStatus.OK);
                } else {
                    return AvicoleUtils.getResponseEntity("Solde ID n'existe pas", HttpStatus.OK);
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
    public ResponseEntity<String> deleteTresorerie(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = tresorerieDao.findById(id);
                if (!optional.isEmpty()){
                    tresorerieDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Solde avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Solde id dosen't existe", HttpStatus.NO_CONTENT);
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
    public Integer sommeTotaleTresorerie() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return tresorerieDao.sommeTotaleTresorerie();
            }
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage de la somme des soldes.", ex);
        }
        return null;
    }
}

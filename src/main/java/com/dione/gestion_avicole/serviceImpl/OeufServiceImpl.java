package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Oeuf;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BatimentDao;
import com.dione.gestion_avicole.dao.OeufDao;
import com.dione.gestion_avicole.service.OeufService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class OeufServiceImpl implements OeufService {

    private OeufDao oeufDao;
    private JwtFilter jwtFilter;
    private BatimentDao batimentDao;

    public OeufServiceImpl(OeufDao oeufDao, JwtFilter jwtFilter, BatimentDao batimentDao) {
        this.oeufDao = oeufDao;
        this.jwtFilter = jwtFilter;
        this.batimentDao = batimentDao;
    }

    @Override
    public ResponseEntity<String> ajoutOeuf(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateOeufMap(requestMap, false)) {
                    Oeuf oeuf = getOeufsFromMap(requestMap, false);
                    if (oeuf.getBatiment() == null) {
                        return AvicoleUtils.getResponseEntity("Le Batiment id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    oeufDao.save(oeuf);
                    return AvicoleUtils.getResponseEntity("Ponte ajoutée avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Oeuf getOeufsFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Oeuf oeuf = new Oeuf();
        if (isAdd) {
            oeuf.setId(Integer.parseInt(requestMap.get("id")));
        }
        oeuf.setDesignation(requestMap.get("designation"));
        oeuf.setQuantite(requestMap.get("quantite"));
        // Validation et ajout de l'id du batiment
        if (requestMap.containsKey("batiment")) {
            try {
                Integer batimentId = Integer.parseInt(requestMap.get("batiment"));

                // Charger le Batiment depuis la base de données
                Batiment batimentFromDB = batimentDao.findById(batimentId).orElse(null);

                if (batimentFromDB == null) {
                    throw new IllegalArgumentException("Le Batiment avec l'ID spécifié n'existe pas.");
                }

                oeuf.setBatiment(batimentFromDB);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        } else {
            throw new IllegalArgumentException("L'identifiant du bâtiment est obligatoire.");
        }
        return oeuf;
    }

    private boolean validateOeufMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("designation")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }


    @Override
    public ResponseEntity<List<Oeuf>> getAllOeuf() {
        try {
            return new ResponseEntity<List<Oeuf>>(oeufDao.findAll(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateOeuf(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateOeufMap(requestMap, true)){
                    Optional optional = oeufDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        oeufDao.save(getOeufsFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Ponte modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Ponte id dosen't exist", HttpStatus.OK);
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
    public ResponseEntity<String> deleteOeuf(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = oeufDao.findById(id);
                if (!optional.isEmpty()){
                    oeufDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Ponte avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Ponte id dosen't existe", HttpStatus.OK);
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

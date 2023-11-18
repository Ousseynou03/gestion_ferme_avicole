package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Fournisseur;
import com.dione.gestion_avicole.POJO.Materiel;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BatimentDao;
import com.dione.gestion_avicole.dao.FournisseurDao;
import com.dione.gestion_avicole.dao.MaterielDao;
import com.dione.gestion_avicole.service.MaterielService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class MaterielServiceImpl implements MaterielService {

    private MaterielDao materielDao;
    private JwtFilter jwtFilter;
    private BatimentDao batimentDao;

    private FournisseurDao fournisseurDao;

    public MaterielServiceImpl(MaterielDao materielDao, JwtFilter jwtFilter, BatimentDao batimentDao, FournisseurDao fournisseurDao) {
        this.materielDao = materielDao;
        this.jwtFilter = jwtFilter;
        this.batimentDao = batimentDao;
        this.fournisseurDao = fournisseurDao;
    }




    @Override
    public ResponseEntity<String> ajoutMateriel(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateMaterielMap(requestMap, false)) {
                    Materiel materiel = getMaterielsFromMap(requestMap, false);
                    if (materiel.getBatiment() == null || materiel.getFournisseur() == null) {
                        return AvicoleUtils.getResponseEntity("Le Batimentid ou le Founisseurid spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    materielDao.save(materiel);
                    return AvicoleUtils.getResponseEntity("Materiel ajouté avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Materiel getMaterielsFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Materiel materiel = new Materiel();
        if (isAdd) {
            materiel.setId(Integer.parseInt(requestMap.get("id")));
        }
        materiel.setDesignation(requestMap.get("designation"));

        // Validation et ajout de quantite
        if (requestMap.containsKey("quantite")) {
            try {
                double quantite = Double.parseDouble(requestMap.get("quantite"));
                materiel.setQuantite(quantite);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }

        // Validation de la relation "batiment"
        if (requestMap.containsKey("batiment")) {
            try {
                Integer batimentId = Integer.parseInt(requestMap.get("batiment"));
                Batiment batiment = batimentDao.findById(batimentId).orElse(null);
                materiel.setBatiment(batiment);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // Validation de la relation "fournisseur"
        if (requestMap.containsKey("fournisseur")) {
            try {
                Integer fournisseurId = Integer.parseInt(requestMap.get("fournisseur"));
                Fournisseur fournisseur = fournisseurDao.findById(fournisseurId).orElse(null);
                materiel.setFournisseur(fournisseur);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return materiel;
    }

    private boolean validateMaterielMap(Map<String, String> requestMap, Boolean validatId) {
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
    public ResponseEntity<List<Materiel>> getAllMateriel() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                return new ResponseEntity<List<Materiel>>(materielDao.findAll(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }

        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateMateriel(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateMaterielMap(requestMap, true)){
                    Optional optional = materielDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        materielDao.save(getMaterielsFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Mateiel modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Materiel id dosen't exist", HttpStatus.OK);
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
    public ResponseEntity<String> deleteMateriel(Integer id) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                Optional optional = materielDao.findById(id);
                if (!optional.isEmpty()){
                    materielDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Materiel avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Materiel id dosen't existe", HttpStatus.OK);
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

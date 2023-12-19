package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Depense;
import com.dione.gestion_avicole.POJO.enums.Categorie;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BandeDao;
import com.dione.gestion_avicole.dao.DepenseDao;
import com.dione.gestion_avicole.service.DepenseService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class DepenseServiceImpl implements DepenseService {

    private DepenseDao depenseDao;
    private BandeDao bandeDao;
    private JwtFilter jwtFilter;

    public DepenseServiceImpl(DepenseDao depenseDao, BandeDao bandeDao, JwtFilter jwtFilter) {
        this.depenseDao = depenseDao;
        this.bandeDao = bandeDao;
        this.jwtFilter = jwtFilter;
    }

    @Override
    public ResponseEntity<String> ajoutDepense(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateDepenseMap(requestMap, false)) {
                    Depense depense = getDepensesFromMap(requestMap, false);
                    if (depense.getBande() == null) {
                        return AvicoleUtils.getResponseEntity("La Bande id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    depenseDao.save(depense);
                    return AvicoleUtils.getResponseEntity("Dépense ajoutée avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Depense getDepensesFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Depense depense = new Depense();
        if (isAdd) {
            depense.setId(Integer.parseInt(requestMap.get("id")));
        }

        depense.setCategorie(Categorie.valueOf((requestMap.get("categorie"))));
        depense.setDescription(requestMap.get("description"));

        // Validation et ajout de quantite
        if (requestMap.containsKey("quantite") && requestMap.containsKey("prixUnitaire")) {
            try {
                double quantite = Double.parseDouble(requestMap.get("quantite"));
                double prixUnitaire = Double.parseDouble(requestMap.get("prixUnitaire"));
                depense.setQuantite(quantite);
                depense.setPrixUnitaire(prixUnitaire);
                depense.calculateMontant();
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }

        if (requestMap.containsKey("dateDepense")) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date dateDepense = dateFormat.parse(requestMap.get("dateDepense"));
                depense.setDateDepense(dateDepense);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // Validation de la relation "bande"
        if (requestMap.containsKey("bande")) {
            try {
                Integer bandeId = Integer.parseInt(requestMap.get("bande"));
                Bande bande = bandeDao.findById(bandeId).orElse(null);
                depense.setBande(bande);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return depense;
    }

    private boolean validateDepenseMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("dateDepense") && requestMap.containsKey("bande")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<Depense>> getAllDepense() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                return new ResponseEntity<List<Depense>>(depenseDao.findAll(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateDepense(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateDepenseMap(requestMap, true)){
                    Optional optional = depenseDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        depenseDao.save(getDepensesFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Dépense modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Dépense id dosen't exist", HttpStatus.OK);
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
    public ResponseEntity<String> updateDepense(Integer depenseId, Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateDepenseMap(requestMap, true)){
                    Optional<Depense> optional = depenseDao.findById(depenseId);
                    if (optional.isPresent()){
                        Depense depenseToUpdate = getDepensesFromMap(requestMap, true);
                        depenseToUpdate.setId(depenseId); // Set the ID before saving
                        depenseDao.save(depenseToUpdate);
                        return AvicoleUtils.getResponseEntity("Dépense modifié avec succès", HttpStatus.OK);
                    } else {
                        return AvicoleUtils.getResponseEntity("Dépense ID doesn't exist", HttpStatus.OK);
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
    public ResponseEntity<String> deleteDepense(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = depenseDao.findById(id);
                if (!optional.isEmpty()){
                    depenseDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Dépense avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Dépense id dosen't existe", HttpStatus.OK);
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
    public Integer totalDepense() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return depenseDao.totalDepense();
            }
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des dépenses.", ex);
        }
        return null;
    }
}

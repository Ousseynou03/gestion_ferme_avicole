package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Veterinaire;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BandeDao;
import com.dione.gestion_avicole.dao.VeterinaireDao;
import com.dione.gestion_avicole.service.VetoService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


@Service
public class VetoServiceImpl implements VetoService {

    private final VeterinaireDao veterinaireDao;
    private final JwtFilter jwtFilter;
    private final BandeDao bandeDao;

    public VetoServiceImpl(VeterinaireDao veterinaireDao, JwtFilter jwtFilter, BandeDao bandeDao) {
        this.veterinaireDao = veterinaireDao;
        this.jwtFilter = jwtFilter;
        this.bandeDao = bandeDao;
    }

    @Override
    public ResponseEntity<String> ajoutVeto(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateVetoMap(requestMap, false)) {
                    Veterinaire veterinaire = getVetosFromMap(requestMap, false);
                    if (veterinaire.getBande() == null) {
                        return AvicoleUtils.getResponseEntity("La Bande id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    veterinaireDao.save(veterinaire);
                    return AvicoleUtils.getResponseEntity("Veto ajouté avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Veterinaire getVetosFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Veterinaire veterinaire = new Veterinaire();
        if (isAdd) {
            veterinaire.setId(Integer.parseInt(requestMap.get("id")));
        }
        veterinaire.setNomVeterinaire(requestMap.get("nomVeterinaire"));
        veterinaire.setTraitement(requestMap.get("traitement"));
        veterinaire.setPosologie(requestMap.get("posologie"));

        if (requestMap.containsKey("date")) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date date = dateFormat.parse(requestMap.get("date"));
                veterinaire.setDate(date);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        if (requestMap.containsKey("bande")) {
            try {
                Integer bandeId = Integer.parseInt(requestMap.get("bande"));
                Bande bande = bandeDao.findById(bandeId).orElse(null);
                veterinaire.setBande(bande);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return veterinaire;
    }






    private boolean validateVetoMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("bande")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<Veterinaire>> getAllVeto() {
        try {
            return new ResponseEntity<List<Veterinaire>>(veterinaireDao.findAll(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateVeto(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateVetoMap(requestMap, true)){
                    Optional optional = veterinaireDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        veterinaireDao.save(getVetosFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Véto modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Véto id dosen't exist", HttpStatus.OK);
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
    public ResponseEntity<String> updateVeto(Integer vetoId, Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateVetoMap(requestMap, true)){
                    Optional<Veterinaire> optional = veterinaireDao.findById(vetoId);
                    if (optional.isPresent()){
                        Veterinaire vetoToUpdate = getVetosFromMap(requestMap, true);
                        vetoToUpdate.setId(vetoId); // Set the ID before saving
                        veterinaireDao.save(vetoToUpdate);
                        return AvicoleUtils.getResponseEntity("Véto modifié avec succès", HttpStatus.OK);
                    } else {
                        return AvicoleUtils.getResponseEntity("Véto ID n'existe pas", HttpStatus.OK);
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
    public ResponseEntity<String> deleteVeto(Integer id) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                Optional optional = veterinaireDao.findById(id);
                if (!optional.isEmpty()){
                    veterinaireDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Véto avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Véto id dosen't existe", HttpStatus.OK);
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

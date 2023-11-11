package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BandeDao;
import com.dione.gestion_avicole.dao.BatimentDao;
import com.dione.gestion_avicole.service.BandeService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


@Service
@Slf4j
public class BandeServiceImpl implements BandeService {

    private BandeDao bandeDao;
    private JwtFilter jwtFilter;

    private BatimentDao batimentDao;

    public BandeServiceImpl(BandeDao bandeDao, JwtFilter jwtFilter, BatimentDao batimentDao) {
        this.bandeDao = bandeDao;
        this.jwtFilter = jwtFilter;
        this.batimentDao = batimentDao;
    }

    @Override
    public ResponseEntity<String> ajoutBande(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateBandeMap(requestMap, false)) {
                    Bande bande = getBandesFromMap(requestMap, false);
                    if (bande.getBatiment() == null) {
                        return AvicoleUtils.getResponseEntity("Le Batiment id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    bandeDao.save(bande);
                    return AvicoleUtils.getResponseEntity("Bande ajoutée avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Bande getBandesFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Bande bande = new Bande();
        if (isAdd) {
            bande.setId(Integer.parseInt(requestMap.get("id")));
        }
        bande.setCode(requestMap.get("code"));
        bande.setDesignation(requestMap.get("designation"));

        // Validation et ajout de effectifdepart
        if (requestMap.containsKey("effectifdepart")) {
            try {
                double effectifDepart = Double.parseDouble(requestMap.get("effectifdepart"));
                bande.setEffectifdepart(effectifDepart);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }

        // Ajout de la dateDebut et dateFin
        if (requestMap.containsKey("dateDebut") && requestMap.containsKey("dateFin")) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date dateDebut = dateFormat.parse(requestMap.get("dateDebut"));
                Date dateFin = dateFormat.parse(requestMap.get("dateFin"));
                bande.setDateDebut(dateDebut);
                bande.setDateFin(dateFin);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        // Validation de la relation "batiment"
        if (requestMap.containsKey("batiment")) {
            try {
                Integer batimentId = Integer.parseInt(requestMap.get("batiment"));
                Batiment batiment = batimentDao.findById(batimentId).orElse(null);
/*                String batimentDesignation = requestMap.get("batiment");
                Batiment batiment = batimentDao.findByDesignation(batimentDesignation).orElse(null);*/
                bande.setBatiment(batiment);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return bande;
    }






    private boolean validateBandeMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("code")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }
    @Override
    public ResponseEntity<List<Bande>> getAllBande() {
        try {
            return new ResponseEntity<List<Bande>>(bandeDao.findAll(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateBande(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateBandeMap(requestMap, true)){
                    Optional optional = bandeDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        bandeDao.save(getBandesFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Bande modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Bande id dosen't exist", HttpStatus.OK);
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
    public ResponseEntity<String> deleteBande(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = bandeDao.findById(id);
                if (!optional.isEmpty()){
                    bandeDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Bande avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Bande id dosen't existe", HttpStatus.OK);
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
    public ResponseEntity<Bande> getBandeById(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                return new ResponseEntity<>(bandeDao.getBandeById(id), HttpStatus.OK);
            }

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new Bande(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Bande>> getLatestThreeBandes() {
        try {
            return new ResponseEntity<List<Bande>>(bandeDao.getLatestThreeBandes(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

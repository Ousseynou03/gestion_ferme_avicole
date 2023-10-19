package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Mortalite;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BandeDao;
import com.dione.gestion_avicole.dao.MortaliteDao;
import com.dione.gestion_avicole.service.MortaliteService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
@Slf4j
public class MortaliteServiceImpl implements MortaliteService {

    private MortaliteDao mortaliteDao;
    private JwtFilter jwtFilter;
    private BandeDao bandeDao;

    public MortaliteServiceImpl(MortaliteDao mortaliteDao, JwtFilter jwtFilter, BandeDao bandeDao) {
        this.mortaliteDao = mortaliteDao;
        this.jwtFilter = jwtFilter;
        this.bandeDao = bandeDao;
    }

    @Override
    public ResponseEntity<String> ajoutMortalite(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateMortaliteMap(requestMap, false)) {
                    Mortalite mortalite = getMortalitesFromMap(requestMap, false);
                    if (mortalite.getBande() == null) {
                        return AvicoleUtils.getResponseEntity("La Bande id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    mortaliteDao.save(mortalite);
                    return AvicoleUtils.getResponseEntity("Mortalité ajoutée avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Mortalite getMortalitesFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Mortalite mortalite = new Mortalite();
        if (isAdd) {
            mortalite.setId(Integer.parseInt(requestMap.get("id")));
        }
        if (requestMap.containsKey("effectif")) {
            try {
                double effectif = Double.parseDouble(requestMap.get("effectif"));
                mortalite.setEffectif(effectif);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }
        mortalite.setDescription(requestMap.get("description"));

        // Ajout de la dateMortalite
        if (requestMap.containsKey("dateMortalite")) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); // Le format de votre date
                Date dateMortalite = dateFormat.parse(requestMap.get("dateMortalite"));
                mortalite.setDateMortalite(dateMortalite);
            } catch (ParseException ex) {
                ex.printStackTrace();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // Validation de la relation "bande"
        if (requestMap.containsKey("bande")) {
            try {
                Integer bandeId = Integer.parseInt(requestMap.get("bande"));
                Bande bande = bandeDao.findById(bandeId).orElse(null);
                mortalite.setBande(bande);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return mortalite;
    }




    private boolean validateMortaliteMap(Map<String, String> requestMap, Boolean validatId) {
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
    public ResponseEntity<List<Mortalite>> getAllMortalite() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                return new ResponseEntity<List<Mortalite>>(mortaliteDao.findAll(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateMortalite(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateMortaliteMap(requestMap, true)){
                    Optional optional = mortaliteDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        mortaliteDao.save(getMortalitesFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Mortalité modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Le id de la Bande spécifié n'existe pas", HttpStatus.OK);
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
    public ResponseEntity<String> deleteMortalite(Integer id) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                Optional optional = mortaliteDao.findById(id);
                if (!optional.isEmpty()){
                    mortaliteDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Mortalite avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Mortalite id : " + id + "n'existe pas", HttpStatus.OK);
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

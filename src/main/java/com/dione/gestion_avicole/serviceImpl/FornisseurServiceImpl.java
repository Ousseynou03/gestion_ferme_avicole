package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Fournisseur;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.FournisseurDao;
import com.dione.gestion_avicole.service.FournisseurService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
@Slf4j
public class FornisseurServiceImpl implements FournisseurService {

    private FournisseurDao fournisseurDao;
    private JwtFilter jwtFilter;

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
    public ResponseEntity<List<Bande>> getAllFournisseur() {
        return null;
    }

    @Override
    public ResponseEntity<String> updateFournisseur(Map<String, String> requestMap) {
        return null;
    }

    @Override
    public ResponseEntity<String> deleteFournisseur(Integer id) {
        return null;
    }
}

package com.dione.gestion_avicole.restImpl;


import com.dione.gestion_avicole.POJO.Materiel;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.MaterielRest;
import com.dione.gestion_avicole.service.MaterielService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class MaterielRestImpl implements MaterielRest {

    private MaterielService materielService;

    public MaterielRestImpl(MaterielService materielService) {
        this.materielService = materielService;
    }

    @Override
    public ResponseEntity<String> ajoutMateriel(Map<String, String> requestMap) {
        try {
            return materielService.ajoutMateriel(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Materiel>> getAllMateriel() {
        try {
            return materielService.getAllMateriel();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateMateriel(Map<String, String> requestMap) {
        try {
            return materielService.updateMateriel(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteMateriel(Integer id) {
        try {
            return materielService.deleteMateriel(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

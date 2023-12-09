package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.ContratLocation;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.ContratLocationRest;
import com.dione.gestion_avicole.service.ContratLocationService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ContratLocationRestImpl implements ContratLocationRest {

    private ContratLocationService contratLocationService;

    public ContratLocationRestImpl(ContratLocationService contratLocationService) {
        this.contratLocationService = contratLocationService;
    }

    @Override
    public ResponseEntity<String> ajoutContratLocation(Map<String, String> requestMap) {
        try {
            return contratLocationService.ajoutContratLocation(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<ContratLocation>> getAllContratLocation() {
        try {
            return contratLocationService.getAllContratLocation();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateContratLocation(Map<String, String> requestMap) {
        try {
            return contratLocationService.updateContratLocation(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteContratLocation(Integer id) {
        try {
            return contratLocationService.deleteContratLocation(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

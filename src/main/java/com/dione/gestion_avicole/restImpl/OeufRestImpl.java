package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Oeuf;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.OeufRest;
import com.dione.gestion_avicole.service.OeufService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class OeufRestImpl implements OeufRest {

    private OeufService oeufService;

    public OeufRestImpl(OeufService oeufService) {
        this.oeufService = oeufService;
    }

    @Override
    public ResponseEntity<String> ajoutOeuf(Map<String, String> requestMap) {
        try {
            return oeufService.ajoutOeuf(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Oeuf>> getAllOeuf() {
        try {
            return oeufService.getAllOeuf();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateOeuf(Map<String, String> requestMap) {
        try {
            return oeufService.updateOeuf(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteOeuf(Integer id) {
        try {
            return oeufService.deleteOeuf(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

package com.dione.gestion_avicole.restImpl;


import com.dione.gestion_avicole.POJO.Tresorerie;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.TresorerieRest;
import com.dione.gestion_avicole.service.TresorerieService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class TresorerieRestImpl implements TresorerieRest {


    private TresorerieService tresorerieService;

    public TresorerieRestImpl(TresorerieService tresorerieService) {
        this.tresorerieService = tresorerieService;
    }


    @Override
    public ResponseEntity<String> ajoutTresorerie(Map<String, String> requestMap) {
        try {
            return tresorerieService.ajoutTresorerie(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Tresorerie>> getAllTresorerie() {
        try {
            return tresorerieService.getAllTresorerie();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateTresorerie(Map<String, String> requestMap) {
        try {
            return tresorerieService.updateTresorerie(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteTresorerie(Integer id) {
        try {
            return tresorerieService.deleteTresorerie(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

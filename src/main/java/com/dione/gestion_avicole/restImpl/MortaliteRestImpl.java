package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Mortalite;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.MoratliteRest;
import com.dione.gestion_avicole.service.MortaliteService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class MortaliteRestImpl implements MoratliteRest {

    private MortaliteService mortaliteService;

    public MortaliteRestImpl(MortaliteService mortaliteService) {
        this.mortaliteService = mortaliteService;
    }

    @Override
    public ResponseEntity<String> ajoutMortalite(Map<String, String> requestMap) {
        try {
            return mortaliteService.ajoutMortalite(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Mortalite>> getAllMortalite() {
        try {
            return mortaliteService.getAllMortalite();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

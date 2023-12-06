package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Oeuf;
import com.dione.gestion_avicole.POJO.Ramassage;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.RamassageRest;
import com.dione.gestion_avicole.service.RamassageService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class RamassageRestImpl implements RamassageRest {

    private RamassageService ramassageService;

    public RamassageRestImpl(RamassageService ramassageService) {
        this.ramassageService = ramassageService;
    }


    @Override
    public ResponseEntity<String> ajoutRamassage(Map<String, String> requestMap) {
        try {
            return ramassageService.ajoutRamassage(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Ramassage>> getAllRamassage() {
        try {
            return ramassageService.getAllRamassage();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateRamassage(Map<String, String> requestMap) {
        try {
            return ramassageService.updateRamassage(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteRamassage(Integer id) {
        try {
            return ramassageService.deleteRamassage(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public Integer nbreTotalOeufRamassage() {
        try {
            return ramassageService.nbreTotalOeufRamassage();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des ramassages.", ex);
        }
    }

    @Override
    public Integer NbreOeufPerdu() {
        try {
            return ramassageService.NbreOeufPerdu();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage de ramassage des oeufs perdus.", ex);
        }
    }

    @Override
    public Integer totalOeuf() {
        try {
            return ramassageService.totalOeuf();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des oeufs totaux.", ex);
        }
    }


}

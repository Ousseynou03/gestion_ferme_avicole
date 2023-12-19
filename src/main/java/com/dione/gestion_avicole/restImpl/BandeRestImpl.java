package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.BandeRest;
import com.dione.gestion_avicole.service.BandeService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class BandeRestImpl implements BandeRest {

    private final BandeService bandeService;

    public BandeRestImpl(BandeService bandeService) {
        this.bandeService = bandeService;
    }




    @Override
    public ResponseEntity<String> ajoutBande(Map<String, String> requestMap) {
        try {
            return bandeService.ajoutBande(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Bande>> getAllBande() {
        try {
            return bandeService.getAllBande();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateBande(Map<String, String> requestMap) {
        try {
            return bandeService.updateBande(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }*/

    @Override
    public ResponseEntity<String> updateBande(Integer id, Map<String, String> requestMap) {
        try {
            return bandeService.updateBande(id, requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> deleteBande(Integer id) {
        try {
            return bandeService.deleteBande(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Bande> getBandeById(Integer id) {
        try {
            return bandeService.getBandeById(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new Bande(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Bande>> getLatestThreeBandes() {
        try {
            return bandeService.getLatestThreeBandes();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public Long countTotalBande() {
        try {
            return bandeService.countTotalBande();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des bandes.", ex);
        }
    }

    @Override
    public Integer totalPouleRestant() {
        try {
            return bandeService.totalPouleRestant();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des poules restantes.", ex);
        }
    }

    @Override
    public ResponseEntity<byte[]> genererRapportPdf(@PathVariable Integer bandeId) {
        byte[] pdfBytes = bandeService.genererRapport(bandeId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "rapport.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }


}

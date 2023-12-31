package com.dione.gestion_avicole.restImpl;

import com.dione.gestion_avicole.POJO.Vente;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.rest.VenteRest;
import com.dione.gestion_avicole.service.VenteService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
public class VenteRestImpl implements VenteRest {

    private final VenteService venteService;

    public VenteRestImpl(VenteService venteService) {
        this.venteService = venteService;
    }

    @Override
    public ResponseEntity<String> ajoutVente(Map<String, String> requestMap) {
        try {
            return venteService.ajoutVente(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Vente>> getAllVente() {
        try {
            return venteService.getAllVente();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateVente(Map<String, String> requestMap) {
        try {
            return venteService.updateVente(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }*/

    @Override
    public ResponseEntity<String> updateVente(@PathVariable Integer venteId, @RequestBody(required = true) Map<String, String> requestMap) {
        try {
            return venteService.updateVente(venteId, requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> deleteVente(Integer id) {
        try {
            return venteService.deleteVente(id);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public Integer sommeTotalVentePoulet() {
        try {
            return venteService.sommeTotalVentePoulet();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des ventes de poulets.", ex);
        }
    }

    @Override
    public Integer sommeTotalVenteOeuf() {
        try {
            return venteService.sommeTotalVenteOeuf();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des ventes d'oeufs.", ex);
        }
    }


    @Override
    public Integer nbrOeufVendu() {
        try {
            return venteService.nbrOeufVendu();
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des oeufs vendus", ex);
        }
    }
}

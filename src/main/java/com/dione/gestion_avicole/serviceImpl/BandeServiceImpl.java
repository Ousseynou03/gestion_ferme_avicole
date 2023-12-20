package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Bande;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Depense;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BandeDao;
import com.dione.gestion_avicole.dao.BatimentDao;
import com.dione.gestion_avicole.dao.DepenseDao;
import com.dione.gestion_avicole.service.BandeService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
//import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;


@Service
//@Slf4j
public class BandeServiceImpl implements BandeService {

    private final BandeDao bandeDao;
    private final JwtFilter jwtFilter;

    private final BatimentDao batimentDao;
    private final DepenseDao depenseDao;

    public BandeServiceImpl(BandeDao bandeDao, JwtFilter jwtFilter, BatimentDao batimentDao, DepenseDao depenseDao) {
        this.bandeDao = bandeDao;
        this.jwtFilter = jwtFilter;
        this.batimentDao = batimentDao;
        this.depenseDao = depenseDao;
    }

    @Override
    public ResponseEntity<String> ajoutBande(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateBandeMap(requestMap, false)) {
                    Bande bande = getBandesFromMap(requestMap, false);
                    if (bande.getBatiment() == null) {
                        return AvicoleUtils.getResponseEntity("Le Batiment id spécifié n'existe pas", HttpStatus.BAD_REQUEST);
                    }
                    bandeDao.save(bande);
                    return AvicoleUtils.getResponseEntity("Bande ajoutée avec succès", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Bande getBandesFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Bande bande = new Bande();
        if (isAdd) {
            bande.setId(Integer.parseInt(requestMap.get("id")));
        }
        bande.setCode(requestMap.get("code"));
        bande.setDesignation(requestMap.get("designation"));
        bande.setCloture("Non");

        // Validation et ajout de effectifdepart
        if (requestMap.containsKey("effectifdepart")) {
            try {
                double effectifDepart = Double.parseDouble(requestMap.get("effectifdepart"));
                bande.setEffectifdepart(effectifDepart);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        }

        // Ajout de la dateDebut et dateFin
        if (requestMap.containsKey("dateDebut") && requestMap.containsKey("dateFin")) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date dateDebut = dateFormat.parse(requestMap.get("dateDebut"));
                Date dateFin = dateFormat.parse(requestMap.get("dateFin"));
                bande.setDateDebut(dateDebut);
                bande.setDateFin(dateFin);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // Validation et ajout de l'id du batiment
        if (requestMap.containsKey("batiment")) {
            try {
                Integer batimentId = Integer.parseInt(requestMap.get("batiment"));

                // Charger le Batiment depuis la base de données
                Batiment batimentFromDB = batimentDao.findById(batimentId).orElse(null);

                if (batimentFromDB == null) {
                    throw new IllegalArgumentException("Le Batiment avec l'ID spécifié n'existe pas.");
                }

                bande.setBatiment(batimentFromDB);
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }
        } else {
            throw new IllegalArgumentException("L'identifiant du bâtiment est obligatoire.");
        }
        return bande;
    }


    private boolean validateBandeMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("code")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }
    @Override
    public ResponseEntity<List<Bande>> getAllBande() {
        try {
            return new ResponseEntity<List<Bande>>(bandeDao.findAll(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateBande(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateBandeMap(requestMap, true)){
                    Optional optional = bandeDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        bandeDao.save(getBandesFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Bande modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Bande id dosen't exist", HttpStatus.OK);
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
    }*/
@Override
public ResponseEntity<String> updateBande(Integer bandeId, Map<String, String> requestMap) {
    try {
        if (jwtFilter.isAdmin() || jwtFilter.isUser()){
            if (validateBandeMap(requestMap, true)){
                Optional<Bande> bande = bandeDao.findById(bandeId);
                if (bande.isPresent()){
                    Bande updateBande = getBandesFromMap(requestMap, true);
                  //  updateBande.setId(bandeId);
                    bandeDao.save(updateBande);
                    return AvicoleUtils.getResponseEntity("Bande modifié avec succès", HttpStatus.OK);
                } else {
                    return AvicoleUtils.getResponseEntity("Bande ID doesn't exist", HttpStatus.OK);
                }
            }
            return AvicoleUtils.getResponseEntity(AvicoleConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
        } else {
            return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
        }
    } catch (Exception ex) {
        ex.printStackTrace();
    }
    return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
}


    @Override
    public ResponseEntity<String> deleteBande(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = bandeDao.findById(id);
                if (!optional.isEmpty()){
                    bandeDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Bande avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Bande id dosen't existe", HttpStatus.OK);
                }

            }else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Bande> getBandeById(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                return new ResponseEntity<>(bandeDao.getBandeById(id), HttpStatus.OK);
            }

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new Bande(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Bande>> getLatestThreeBandes() {
        try {
            return new ResponseEntity<List<Bande>>(bandeDao.getLatestThreeBandes(), HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public Long countTotalBande() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return bandeDao.countTotalBande();
            }
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des bandes.", ex);
        }
        return null;
    }

    @Override
    public Integer totalPouleRestant() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return bandeDao.totalPouleRestant();
            }
        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des poules restantes.", ex);
        }
        return null;
    }




    // Génération de Rapport
    @Override
    public byte[] genererRapport(Integer bandeId) {
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            Bande bande = bandeDao.findById(bandeId).orElse(null);
            if (bande != null) {
                // Récupérer les données de la bande
                String codeBande = bande.getCode();
                String designationBande = bande.getDesignation();
                String codeBatiment = bande.getBatiment().getCode();
                String designationBatiment = bande.getBatiment().getDesignation();

                // Ajouter les données de la bande au rapport
                document.add(new Paragraph("Code de la bande: " + codeBande));
                document.add(new Paragraph("Désignation de la bande: " + designationBande));
                document.add(new Paragraph("Code du batiment: " + codeBatiment));
                document.add(new Paragraph("Désignation du batiment: " + designationBatiment));

                // Récupérer les dépenses liées à la bande
                List<Depense> depenses = depenseDao.findByBandeId(bandeId);

                // Si des dépenses sont trouvées, les ajouter au rapport
                if (depenses != null && !depenses.isEmpty()) {
                    List<String> categories = depenses.stream()
                            .map(depense -> depense.getCategorie().toString())
                            .collect(Collectors.toList());
                    document.add(new Paragraph("\nCatégories de dépense: " + String.join(", ", categories)));

                    List<String> quantites = depenses.stream()
                            .map(depense -> String.valueOf(depense.getQuantite()))
                            .collect(Collectors.toList());
                    document.add(new Paragraph("Quantités: " + String.join(", ", quantites)));

                    // Ajoutez d'autres données de dépense au besoin
                }
            }

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return baos.toByteArray();
    }








}



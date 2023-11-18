package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.BatimentDao;
import com.dione.gestion_avicole.service.BatimentService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class BatimentServiceImpl implements BatimentService {

    private BatimentDao batimentDao;
    private JwtFilter jwtFilter;

    public BatimentServiceImpl(BatimentDao batimentDao, JwtFilter jwtFilter) {
        this.batimentDao = batimentDao;
        this.jwtFilter = jwtFilter;
    }


    @Override
    public ResponseEntity<String> ajoutBatiment(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateBatimentMap(requestMap, false)) {
                    batimentDao.save(getBatimentsFromMap(requestMap, false));
                    return AvicoleUtils.getResponseEntity("Batiment ajouté avec succés", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Batiment getBatimentsFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Batiment batiment = new Batiment();
        if (isAdd) {
            batiment.setId(Integer.parseInt(requestMap.get("id")));
        }
        batiment.setCode(requestMap.get("code"));
        batiment.setDesignation(requestMap.get("designation"));
        batiment.setCapacite(requestMap.get("capacite"));
        batiment.setDimension(requestMap.get("dimension"));
        return batiment;
    }

    private boolean validateBatimentMap(Map<String, String> requestMap, Boolean validatId) {
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
    public ResponseEntity<List<Batiment>> getAllBatiment() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return new ResponseEntity<List<Batiment>>(batimentDao.findAll(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateBatiment(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateBatimentMap(requestMap, true)) {
                    Optional optional = batimentDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()) {
                        batimentDao.save(getBatimentsFromMap(requestMap, true));
                        return AvicoleUtils.getResponseEntity("Batiment modifié avec succés", HttpStatus.OK);
                    } else {
                        return AvicoleUtils.getResponseEntity("Batiment id dosen't exist", HttpStatus.OK);
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
    public ResponseEntity<String> deleteBatiment(Integer id) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional optional = batimentDao.findById(id);
                if (!optional.isEmpty()) {
                    batimentDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Batiment avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                } else {
                    return AvicoleUtils.getResponseEntity("Batiment id dosen't existe", HttpStatus.NO_CONTENT);
                }

            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> getBatimentDesignationById(Integer id) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                Optional<Batiment> batimentOptional = batimentDao.findById(id);

                if (batimentOptional.isPresent()) {
                    Batiment batiment = batimentOptional.get();
                    return AvicoleUtils.getResponseEntity(batiment.getDesignation(), HttpStatus.OK);
                } else {
                    return AvicoleUtils.getResponseEntity("Batiment avec id: " + id + " n'existe pas", HttpStatus.NOT_FOUND);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Long countTotalBatiments() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                return batimentDao.countTotalBatiments();
            }

        }catch (Exception ex){
            throw new RuntimeException("Erreur lors du comptage des bâtiments.", ex);
        }
        return null;
    }

}

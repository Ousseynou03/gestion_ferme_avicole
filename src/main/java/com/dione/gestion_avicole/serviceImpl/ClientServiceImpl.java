package com.dione.gestion_avicole.serviceImpl;

import com.dione.gestion_avicole.JWT.JwtFilter;
import com.dione.gestion_avicole.POJO.Batiment;
import com.dione.gestion_avicole.POJO.Client;
import com.dione.gestion_avicole.constents.AvicoleConstants;
import com.dione.gestion_avicole.dao.ClientDao;
import com.dione.gestion_avicole.service.ClientService;
import com.dione.gestion_avicole.utils.AvicoleUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    private ClientDao clientDao;
    private JwtFilter jwtFilter;

    public ClientServiceImpl(ClientDao clientDao, JwtFilter jwtFilter) {
        this.clientDao = clientDao;
        this.jwtFilter = jwtFilter;
    }

    @Override
    public ResponseEntity<String> ajoutClient(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()) {
                if (validateClientMap(requestMap, false)) {
                    clientDao.save(getClientsFromMap(requestMap, false));
                    return AvicoleUtils.getResponseEntity("Client ajouté avec succés", HttpStatus.OK);
                }
            } else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Client getClientsFromMap(Map<String, String> requestMap, Boolean isAdd) {
        Client client = new Client();
        if (isAdd){
            client.setId(Integer.parseInt(requestMap.get("id")));
        }
        client.setNom(requestMap.get("nom"));
        client.setVille(requestMap.get("ville"));
        client.setNumTel(requestMap.get("numTel"));
        return client;
    }
    private boolean validateClientMap(Map<String, String> requestMap, Boolean validatId) {
        if (requestMap.containsKey("nom")) {
            if (requestMap.containsKey("id") && validatId) {
                return true;
            } else if (!validatId) {
                return true;
            }
        }
        return false;
    }

    @Override
    public ResponseEntity<List<Client>> getAllClient() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                return new ResponseEntity<List<Client>>(clientDao.findAll(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

/*    @Override
    public ResponseEntity<String> updateClient(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isUser()){
                if (validateClientMap(requestMap, true)){
                    Optional optional = clientDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()){
                        clientDao.save(getClientsFromMap(requestMap,true));
                        return AvicoleUtils.getResponseEntity("Client modifié avec succés", HttpStatus.OK);
                    }else {
                        return AvicoleUtils.getResponseEntity("Client id dosen't exist", HttpStatus.OK);
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
public ResponseEntity<String> updateClient(Integer clientId, Map<String, String> requestMap) {
    try {
        if (jwtFilter.isAdmin() || jwtFilter.isUser()){
            if (validateClientMap(requestMap, true)){
                Optional<Client> optional = clientDao.findById(clientId);
                if (optional.isPresent()){
                    Client clientToUpdate = getClientsFromMap(requestMap, true);
                    clientToUpdate.setId(clientId); // Set the ID before saving
                    clientDao.save(clientToUpdate);
                    return AvicoleUtils.getResponseEntity("Client modifié avec succès", HttpStatus.OK);
                } else {
                    return AvicoleUtils.getResponseEntity("Client ID doesn't exist", HttpStatus.OK);
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
    public ResponseEntity<String> deleteClient(Integer id) {
        try {
            if (jwtFilter.isAdmin()){
                Optional optional = clientDao.findById(id);
                if (!optional.isEmpty()){
                    clientDao.deleteById(id);
                    return AvicoleUtils.getResponseEntity("Client avec id: " + id + " est supprimé avec succés", HttpStatus.OK);
                }else {
                    return AvicoleUtils.getResponseEntity("Client id dosen't existe", HttpStatus.NO_CONTENT);
                }

            }else {
                return AvicoleUtils.getResponseEntity(AvicoleConstants.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return AvicoleUtils.getResponseEntity(AvicoleConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

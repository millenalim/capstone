package learn.controllers;

import learn.App;
import learn.domain.Result;
import learn.models.AppUser;
import learn.domain.AppUserService;
import learn.models.Language;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost3000"})
public class AppUserController {
    private final AppUserService service;

    public AppUserController(AppUserService service){this.service = service;}

    @GetMapping("/users")
    public List<AppUser> findAllUsers() {return service.findAllUsers();}

//    @PutMapping("/create_profile")
//    public ResponseEntity<?> createProfile(@RequestBody AppUser appUser, Map<String, String> credentials) {
//        String firstName = credentials.get("first_name");
//        String lastName = credentials.get("last_name");
//        String bio = credentials.get("bio");
//
//        Result<AppUser> result = service.createProfile(appUser,firstName,lastName, bio);
//
//        // unhappy path...
//        if (!result.isSuccess()) {
//            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
//        }
//        // happy path...
//        HashMap<String, Integer> map = new HashMap<>();
//        map.put("appUserId", result.getPayload().getAppUserId());
//
//        return new ResponseEntity<>(map, HttpStatus.CREATED);
//    }


    @DeleteMapping("/{appUserId}")
    public ResponseEntity<Void> deleteById(@PathVariable int appUserId){
        if(service.deleteById(appUserId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}

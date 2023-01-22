package learn.controllers;

import learn.App;
import learn.domain.Result;
import learn.models.AppUser;
import learn.domain.AppUserService;
import learn.models.Language;
import learn.models.Proficiency;
import learn.models.Schedule;
import org.apache.coyote.Response;
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


    @GetMapping("/user/{appUserId}")
    public AppUser findById(@PathVariable int appUserId) {
        return service.findById(appUserId);
    }

    @PostMapping("/user")
    public ResponseEntity<Object> add(@RequestBody AppUser appUser) {
        Result<AppUser> result = service.createProfile(appUser);

        // unhappy path...
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/discover")
    public List<AppUser> displayMatches(@RequestBody AppUser appUser) {return service.displayMatches(appUser);}


    @PutMapping("/create_profile")
    public ResponseEntity<?> createProfile(@RequestBody AppUser appUser) {

        Result<AppUser> result = service.createProfile(appUser);

        // unhappy path...
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{appUserId}")
    public ResponseEntity<Void> deleteById(@PathVariable int appUserId){
        if(service.deleteById(appUserId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}

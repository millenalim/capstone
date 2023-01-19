package learn.controllers;

import learn.domain.Result;
import learn.models.AppUser;
import learn.domain.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost3000"})
public class AppUserController {
    private final AppUserService service;

    public AppUserController(AppUserService service){this.service = service;}

    @GetMapping("/users")
    public List<AppUser> findAllUsers() {return service.findAllUsers();}


    @DeleteMapping("/{appUserId}")
    public ResponseEntity<Void> deleteById(@PathVariable int appUserId){
        if(service.deleteById(appUserId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}

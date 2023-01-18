package learn.controllers;

import learn.models.AppUser;
import learn.security.AppUserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost3000"})
@RequestMapping("/api/")
public class AppUserController {
    private final AppUserService service;

    public AppUserController(AppUserService service){this.service = service;}

    @GetMapping
    public List<AppUser> findAll() {return service.findAll();}
}

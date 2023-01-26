package learn.controllers;

import learn.domain.LanguageService;
import learn.models.Language;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost3000"})
@RequestMapping("/language")
public class LanguageController {
    private final LanguageService service;

    public LanguageController(LanguageService service) {
        this.service = service;
    }
    @GetMapping
    public List<Language> findAllLanguages(){return service.findAll();}

    @GetMapping("/{languageId}")
    public Language findById(@PathVariable int languageId){return service.findById(languageId);}

}

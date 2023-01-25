package learn.controllers;

import learn.domain.LanguageService;
import learn.models.Language;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost3000"})
public class LanguageController {
    private LanguageService service;

    @GetMapping("/{languageId}")
    public Language findById(@PathVariable int languageId){return service.findById(languageId);}

}

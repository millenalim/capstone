package learn.domain;

import learn.data.LanguageRepository;
import learn.models.Language;
import org.springframework.stereotype.Service;

@Service
public class LanguageService {

    private final LanguageRepository languageRepository;

    public LanguageService(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    public Language findById(int languageId){return languageRepository.findById(languageId);}
}

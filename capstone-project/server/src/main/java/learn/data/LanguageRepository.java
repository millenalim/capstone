package learn.data;

import learn.models.Language;

import java.util.List;

public interface LanguageRepository {
    List<Language> findAll();

    Language findById(int languageId);
}

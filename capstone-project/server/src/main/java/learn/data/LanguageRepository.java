package learn.data;

import learn.models.Language;

public interface LanguageRepository {
    Language findById(int languageId);
}

package learn.models;

public class Language {

    private int languageId;
    private String language;

    public Language(int languageId, String language) {
        this.languageId = languageId;
        this.language = language;
    }

    public int getLanguageId() {
        return languageId;
    }

    public void setLanguageId(int languageId) {
        this.languageId = languageId;
    }


    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}

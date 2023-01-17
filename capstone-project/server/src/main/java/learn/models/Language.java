package learn.models;

public enum Language {
    JAVA(1, "Java"),
    C(2, "C"),
    CPLUSPLUS(3, "C++"),
    CSHARP(4, "C#"),
    JAVASCRIPT(5, "JavaScript"),
    PYTHON(6, "Python"),
    PHP(7, "PHP"),
    SQL(8, "SQL");

    private int languageId;
    private final String language;

    Language(int languageId, String language) {
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

    //Method to find Language by name
    public static Language findByName(String language) {
        for (Language languageToFind : Language.values()) {
            if(languageToFind.getLanguage().equalsIgnoreCase(language)) {
                return languageToFind;
            }
        }

        String message = String.format("%s is not available", language);
        throw new RuntimeException(message);
    }
}

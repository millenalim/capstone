package learn.models;

public class Proficiency {
    private int proficiencyLevelId;
    private String proficiencyLevel;
    private int appUserId;
    private Language language;

    public Proficiency() {
    }


    public Proficiency(int proficiencyLevelId, String proficiencyLevel, int appUserId, Language language) {
        this.proficiencyLevelId = proficiencyLevelId;
        this.proficiencyLevel = proficiencyLevel;
        this.appUserId = appUserId;
        this.language = language;
    }

    public int getProficiencyLevelId() {
        return proficiencyLevelId;
    }

    public void setProficiencyLevelId(int proficiencyLevelId) {
        this.proficiencyLevelId = proficiencyLevelId;
    }

    public String getProficiencyLevel() {
        return proficiencyLevel;
    }

    public void setProficiencyLevel(String proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }

    public int getAppUserId() {
        return appUserId;
    }

//    public void setAppUserId(AppUser appUserId) {
//        this.appUserId = appUserId;
//    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }
}

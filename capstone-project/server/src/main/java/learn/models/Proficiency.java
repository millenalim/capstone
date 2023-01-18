package learn.models;

public class Proficiency {
    private int proficiencyLevelId;
    private String proficiencyLevel;
    private AppUser appUserId;
    private Language languageId;

    public Proficiency() {
    }

    public Proficiency(int proficiencyLevelId, String proficiencyLevel) {
        this.proficiencyLevelId = proficiencyLevelId;
        this.proficiencyLevel = proficiencyLevel;
    }

    public Proficiency(int proficiencyLevelId, String proficiencyLevel, AppUser appUserId, Language languageId) {
        this.proficiencyLevelId = proficiencyLevelId;
        this.proficiencyLevel = proficiencyLevel;
        this.appUserId = appUserId;
        this.languageId = languageId;
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

    public AppUser getAppUserId() {
        return appUserId;
    }

//    public void setAppUserId(AppUser appUserId) {
//        this.appUserId = appUserId;
//    }

    public Language getLanguageId() {
        return languageId;
    }

//    public void setLanguageId(Language languageId) {
//        this.languageId = languageId;
//    }
}

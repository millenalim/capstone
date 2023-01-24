package learn.models;

public class AppRole {
    //Fix naming conventions for appRoleId
    private int appRoleId;
    private String name;

    public AppRole(int appRoleId, String name) {
        this.appRoleId = appRoleId;
        this.name = name;
    }

    public int getappRoleId() {
        return appRoleId;
    }

    public void setappRoleId(int appRoleId) {
        this.appRoleId = appRoleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

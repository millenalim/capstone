package learn.models;

public class AppRole {
    private int app_role_id;
    private String name;

    public AppRole(int app_role_id, String name) {
        this.app_role_id = app_role_id;
        this.name = name;
    }

    public int getApp_role_id() {
        return app_role_id;
    }

    public void setApp_role_id(int app_role_id) {
        this.app_role_id = app_role_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

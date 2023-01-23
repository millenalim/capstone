package learn.models;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Schedule {
    private int scheduleId;
    private DayOfWeek dayOfWeek;
    private String availability;
    private List<Integer> appUserIds;

    public Schedule(int scheduleId, DayOfWeek dayOfWeek, String availability) {
        this.scheduleId = scheduleId;
        this.dayOfWeek = dayOfWeek;
        this.availability = availability;
    }
    public Schedule(){}

    public int getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek){ this.dayOfWeek = dayOfWeek;}

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public List<Integer> getAppUserIds() {
        return new ArrayList<>(appUserIds);
    }

    public void setAppUserIds(List<Integer> appUserIds) {
        this.appUserIds.clear();
        this.appUserIds.addAll(appUserIds);
//        this.appUserIds = appUserIds;
    }
}

package learn.models;

import java.time.DayOfWeek;
import java.util.Date;

public class Schedule {
    private int scheduleId;
    private final DayOfWeek dayOfWeek;
    private String availability;

    public Schedule(int scheduleId, DayOfWeek dayOfWeek, String availability) {
        this.scheduleId = scheduleId;
        this.dayOfWeek = dayOfWeek;
        this.availability = availability;
    }

    public int getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }
}

package learn.data;

import learn.models.Schedule;

public interface ScheduleRepository {

    boolean deleteByKey(int appUserId, int scheduleId);
}

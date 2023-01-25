package learn.data;

import learn.models.Schedule;

import java.util.List;

public interface ScheduleRepository {

    boolean deleteByKey(int appUserId, int scheduleId);

    List<Schedule> findAll();

    Schedule findById(int scheduleId);
}

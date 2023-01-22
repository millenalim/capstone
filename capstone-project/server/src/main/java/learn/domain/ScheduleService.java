package learn.domain;

import learn.data.ScheduleRepository;

public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public boolean deleteByKey(int appUserId,int scheduleId){return scheduleRepository.deleteByKey(appUserId,scheduleId);}
}

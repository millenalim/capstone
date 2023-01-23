package learn.domain;

import learn.data.ScheduleRepository;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public boolean deleteByKey(int appUserId,int scheduleId){return scheduleRepository.deleteByKey(appUserId,scheduleId);}
}

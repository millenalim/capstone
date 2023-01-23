package learn.domain;

import learn.data.ScheduleRepository;
import learn.models.Schedule;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public boolean deleteByKey(int appUserId,int scheduleId){return scheduleRepository.deleteByKey(appUserId,scheduleId);}

    public List<Schedule> findAll() {return scheduleRepository.findAll();}
}

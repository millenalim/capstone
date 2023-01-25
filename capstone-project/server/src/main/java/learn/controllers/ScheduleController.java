package learn.controllers;

import learn.domain.ScheduleService;
import learn.models.Schedule;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost3000"})
public class ScheduleController {
    private final ScheduleService service;

    public ScheduleController(ScheduleService service) {
        this.service = service;
    }

    @GetMapping("/{scheduleId}")
    public Schedule findById(@PathVariable int scheduleId) {return service.findById(scheduleId);}

    @GetMapping("/schedule")
    public List<Schedule> findAllSchedules(){
        return service.findAll();
    }
    @DeleteMapping("/{appUserId}/{scheduleId}")
    public ResponseEntity<Void> deleteByKey(@PathVariable int appUserId, @PathVariable int scheduleId) {
        if (service.deleteByKey(appUserId, scheduleId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}

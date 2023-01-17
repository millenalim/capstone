package learn.data.mappers;

import learn.models.Schedule;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.DayOfWeek;

public class ScheduleMapper implements RowMapper<Schedule> {
    @Override
    public Schedule mapRow(ResultSet resultSet, int i) throws SQLException {
        Schedule schedule = new Schedule();
        schedule.setScheduleId(resultSet.getInt("schedule_id"));
        schedule.setDayOfWeek(DayOfWeek.valueOf(resultSet.getString("day_of_week")));
        schedule.setAvailability(resultSet.getString("availability"));
        return schedule;
    }

}

package learn.data;

import learn.data.mappers.ScheduleMapper;
import learn.models.Schedule;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ScheduleJdbcTemplateRepository implements ScheduleRepository {
    private final JdbcTemplate jdbcTemplate;

    public ScheduleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean deleteByKey(int appUserId, int scheduleId) {
        final String sql = "delete from app_user_schedule "
                + "where app_user_id = ? and schedule_id = ?;";

        return jdbcTemplate.update(sql, appUserId, scheduleId) > 0;
    }

    @Override
    public List<Schedule> findAll() {
        final String sql = "select schedule_id, day_of_week, availability "
                + "from schedule;";
        return jdbcTemplate.query(sql, new ScheduleMapper());
    }
}

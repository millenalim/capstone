package learn.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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

        return jdbcTemplate.update(sql,appUserId,scheduleId) > 0;
    }
}

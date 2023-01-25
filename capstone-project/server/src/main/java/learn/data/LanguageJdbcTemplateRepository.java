package learn.data;

import learn.data.mappers.LanguageMapper;
import learn.data.mappers.ScheduleMapper;
import learn.models.Language;
import org.springframework.jdbc.core.JdbcTemplate;

public class LanguageJdbcTemplateRepository implements LanguageRepository{
    private final JdbcTemplate jdbcTemplate;

    public LanguageJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Language findById(int languageId) {

            final String sql = "select language_id, `language` "
                    + "from `language` "
                    + "where language_id = ?;";
            return jdbcTemplate.query(sql,new LanguageMapper(),languageId).stream()
                    .findFirst().orElse(null);

    }
}

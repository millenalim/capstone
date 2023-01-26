package learn.data;

import learn.data.mappers.LanguageMapper;
import learn.models.Language;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LanguageJdbcTemplateRepository implements LanguageRepository{
    private final JdbcTemplate jdbcTemplate;

    public LanguageJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Language> findAll(){
        final String sql = "select language_id, `language` "
                + "from `language`;";
        return jdbcTemplate.query(sql,new LanguageMapper());
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

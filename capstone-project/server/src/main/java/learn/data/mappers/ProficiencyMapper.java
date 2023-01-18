package learn.data.mappers;

import learn.App;
import learn.models.AppUser;
import learn.models.Language;
import learn.models.Proficiency;

import org.springframework.jdbc.core.RowMapper;
import javax.swing.tree.TreePath;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ProficiencyMapper implements RowMapper<Proficiency> {

    @Override
    public Proficiency mapRow(ResultSet rs, int i) throws SQLException {
        return new Proficiency(
                rs.getInt("proficiency_id"),
                rs.getString("proficiency_level")
        );
    }
}

package learn.data;

import learn.data.mappers.AppUserMapper;
import learn.data.mappers.LanguageMapper;
import learn.data.mappers.ProficiencyMapper;
import learn.data.mappers.ScheduleMapper;
import learn.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;
import java.util.List;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository {

    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<AppUser> findAll() {
        final String sql = "select app_user_id, first_name, last_name, username, password_hash, bio, enabled "
                + "from app_user;";
        List<AppUser> appUserList = jdbcTemplate.query(sql, new AppUserMapper());
        for (AppUser user : appUserList) {
            user.setAuthorities(getRolesByUsername(user.getUsername()));
            getProficiency(user);
            addLanguage(user);
            addSchedule(user);
        }
        return appUserList;
    }

    public List<AppUser> findAllUsers() {
        final String sql = "select ar.*,au.* "
                + "from app_role ar "
                + "inner join app_user_role aur on aur.app_role_id = ar.app_role_id "
                + "inner join app_user au on au.app_user_id = aur.app_user_id "
                + "where `name` = 'USER';";
        List<AppUser> appUserList = jdbcTemplate.query(sql, new AppUserMapper());
        addDetails(appUserList);
        return appUserList.stream().toList();
    }

    @Override
    public List<AppUser> displayMatches(AppUser user) {
//        List<AppUser> appUserList = findAll();
//        return appUserList.stream().filter(u-> u.getLanguage()==user.getLanguage()).collect(Collectors.toList());
        return null;

    }


    @Override
    @Transactional
    public AppUser findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = "select app_user_id, username, password_hash, bio, enabled "
                + "from app_user "
                + "where username = ?;";
        List<AppUser> appUserList = jdbcTemplate.query(sql, new AppUserMapper(roles), username);
        addDetails(appUserList);


        return appUserList
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public AppUser create(AppUser user) {

        final String sql = "insert into app_user (username, password_hash) values (?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setAppUserId(keyHolder.getKey().intValue());

        updateRoles(user);

        return user;
    }

    @Override
    @Transactional
    public boolean update(AppUser user) {

        final String sql = "update app_user set "
                + "username = ?, "
                + "enabled = ? "
                + "where app_user_id = ?";

        boolean updated = jdbcTemplate.update(sql,
                user.getUsername(), user.isEnabled(), user.getAppUserId()) > 0;

        if (updated) {
            updateRoles(user);
        }

        return updated;
    }

    @Override
    @Transactional
    public boolean deleteById(int appUserId){
        jdbcTemplate.update("delete from app_user_role where app_user_id =?;", appUserId);
        jdbcTemplate.update("delete from app_user_schedule where app_user_id=?;", appUserId);
        jdbcTemplate.update("delete from app_user_language where app_user_id=?;", appUserId);
        return jdbcTemplate.update("delete from app_user where app_user_id=?;", appUserId) >0;

    }

    private void updateRoles(AppUser user) {
        // delete all roles, then re-add
        jdbcTemplate.update("delete from app_user_role where app_user_id = ?;", user.getAppUserId());

        Collection<GrantedAuthority> authorities = user.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (GrantedAuthority role : authorities) {
            String sql = "insert into app_user_role (app_user_id, app_role_id) "
                    + "select ?, app_role_id from app_role where `name` = ?;";
            jdbcTemplate.update(sql, user.getAppUserId(), role.getAuthority());
        }
    }

    private List<String> getRolesByUsername(String username) {
        final String sql = "select r.name "
                + "from app_user_role ur "
                + "inner join app_role r on ur.app_role_id = r.app_role_id "
                + "inner join app_user au on ur.app_user_id = au.app_user_id "
                + "where au.username = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), username);
    }

    private void getProficiency(AppUser appUser) {
        final String sql = "select aul.proficiency_level_id, aul.proficiency_level "
                + "from app_user_language aul "
                + "where aul.app_user_id = ?";

        var proficiencyList = jdbcTemplate.query(sql, new ProficiencyMapper(), appUser.getAppUserId());
        var proficiency = proficiencyList.stream().findFirst().orElse(null);

        appUser.setProficiency(proficiency);
    }


    private void addLanguage(AppUser appUser) {
        final String sql = "select l.language_id, l.language "
                + "from language l "
                + "inner join app_user_language aul on l.language_id = aul.language_Id "
                + "where aul.app_user_id =?;";
        var languageList = jdbcTemplate.query(sql, new LanguageMapper(), appUser.getAppUserId());
        var language = languageList.stream().findFirst().orElse(null);
        appUser.setLanguage(language);
    }

    private void addSchedule(AppUser appUser) {
        final String sql = "select s.schedule_id, s.day_of_week, s.availability "
                + "from schedule s "
                + "inner join app_user_schedule aus on s.schedule_id = aus.schedule_id "
                + "where aus.app_user_id = ?;";
        var schedule = jdbcTemplate.query(sql, new ScheduleMapper(), appUser.getAppUserId());
        appUser.setSchedule(schedule);
    }

    private void addDetails(List<AppUser> appUserList) {
        for (AppUser user : appUserList) {
            user.setAuthorities(getRolesByUsername(user.getUsername()));
            getProficiency(user);
            addLanguage(user);
            addSchedule(user);
        }
    }

}

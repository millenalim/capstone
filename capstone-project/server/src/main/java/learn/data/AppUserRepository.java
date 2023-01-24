package learn.data;

import learn.App;
import learn.models.AppUser;
import learn.models.Language;
import learn.models.Proficiency;
import learn.models.Schedule;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {
    @Transactional
    AppUser findByUsername(String username);

    List<AppUser> findAll();

    List<AppUser> findAllUsers();

    AppUser findById(int id);

    @Transactional
    List<AppUser> displayMatches(AppUser user);

    @Transactional
    AppUser createAccount(AppUser appUser);

    @Transactional
    AppUser createProfile(AppUser appUser);

    @Transactional
    boolean updateSchedule(AppUser appUser);

    @Transactional
    boolean update(AppUser user);


    @Transactional
    boolean deleteById(int appUserId);
}

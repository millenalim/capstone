package learn.data;

import learn.App;
import learn.models.AppUser;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {
    @Transactional
    AppUser findByUsername(String username);

    List<AppUser> findAll();
    @Transactional
    List<AppUser> displayMatches(AppUser user);

    @Transactional
    AppUser create(AppUser user);

    @Transactional
    boolean update(AppUser user);


}

package learn.domain;

import learn.App;
import learn.data.AppUserRepository;
import learn.models.AppUser;
import learn.models.Language;
import learn.models.Schedule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.DayOfWeek;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@SpringBootTest
class AppUserServiceTest {

    @Autowired
    AppUserService service;

    @MockBean
    AppUserRepository repository;


    @Test
    void shouldCreateNewUser() {
        Result<AppUser> testDummy = service.createAccount("fake@user.com", "P@ssw0rd!");
        assertNotNull(testDummy);
    }

    @Test
    void shouldNotCreateNewUserIfPassWordIsInvalid() {
        Result<AppUser> testDummy = service.createAccount("fake@user.com", "hey");
        assertNull(testDummy);
    }

    @Test
    void shouldAddProfileToUser() {
        AppUser appUser = new AppUser(4,"fake@user.com",
                "P@ssw0rd!",
                false,
                List.of("USER"));

        Result<AppUser> profileAdded = service.createProfile(
                appUser,
                "test",
                "dummy",
                "hello, I don't really exist",
                appUser.getLanguage(),
                appUser.getProficiency(),
                List.of(new Schedule(1, DayOfWeek.MONDAY, "Morning")));

    }


}
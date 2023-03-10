package learn.domain;

import learn.App;
import learn.data.AppUserRepository;
import learn.models.AppUser;
import learn.models.Language;
import learn.models.Proficiency;
import learn.models.Schedule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.DayOfWeek;
import java.util.ArrayList;
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
    void shouldFindUserById() {
        AppUser testDummy = new AppUser(1, "test@dummy.com", "P@ssw0rd!", true, List.of("USER"));
        when(repository.findById(1)).thenReturn(testDummy);
        assertNotNull(testDummy);
        assertEquals("test@dummy.com", testDummy.getUsername());

    }
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

        service.createAccount(appUser.getUsername(), appUser.getPassword());
        appUser.setFirstName("test");
        appUser.setLastName("dummy");
        appUser.setBio("hello, I don't really exist");
        appUser.setProficiencyLevel("Beginner");
        appUser.setLanguageId(1);
//        appUser.setProficiency(new Proficiency(1,"Beginner", 5,new Language(1,"Java"))
        appUser.setSchedule(List.of(new Schedule(1, DayOfWeek.MONDAY, "Morning")));

        Result<AppUser> profileAdded = service.createProfile(appUser);
        assertNotNull(profileAdded);

    }

    @Test
    void shouldUpdateSchedule() {
        AppUser testDummy = new AppUser(1, "test@dummy.com", "P@ssw0rd!", true, List.of("USER"));
        testDummy.setSchedule(List.of(new Schedule(1, DayOfWeek.MONDAY, "Morning")));
        when(repository.updateSchedule(testDummy)).thenReturn(true);

        Result<AppUser> actual = service.updateSchedule(testDummy);
        assertEquals(ActionStatus.SUCCESS, actual.getStatus());


    }


}
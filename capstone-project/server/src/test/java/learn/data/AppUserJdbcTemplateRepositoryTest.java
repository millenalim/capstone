package learn.data;

import learn.App;
import learn.models.AppUser;
import learn.models.Language;
import learn.models.Proficiency;
import learn.models.Schedule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;



@SpringBootTest
class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    private AppUserJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }


    @Test
    void shouldFindAll() {
    List<AppUser> all = repository.findAll();
        assertNotNull(all);
        assertEquals(3, all.size());
    }

    @Test
    void shouldFindOneUser() {
        List<AppUser> actual = repository.findAllUsers();
        assertEquals(1, actual.size());
    }

    @Test
    void shouldFindByUsername() {
        AppUser testDummy = repository.findByUsername("morgan@oliver.com");

        assertTrue(testDummy.isEnabled());
        assertNotNull(testDummy);
    }

    @Test
    void shouldNotFindByUsername() {
        AppUser testDummy = repository.findByUsername("youdontexist@null.com");
        assertNull(testDummy);
    }

    @Test
    void shouldFindTwoMatchesBasedOnJavaLanguage() {
        AppUser firstUser = new AppUser(0,"fakeprofile-" +new Random().nextInt(1000) +"@user.com",
                "P@ssw0rd!",
                false,
                List.of("USER"));
        firstUser = repository.createAccount(firstUser);

        firstUser.setFirstName("test");
        firstUser.setLastName("dummy");
        firstUser.setBio("Hello");
        firstUser.setProficiency(new Proficiency(1,"Beginner", 5,new Language(1,"Java")));
        firstUser.setSchedule(List.of(new Schedule(1, DayOfWeek.MONDAY, "Morning")));
        AppUser firstProfileAdded = repository.createProfile(firstUser);

        AppUser secondUser = new AppUser(0,"fakeprofile-" +new Random().nextInt(1000) +"@user.com",
                "P@ssw0rd!",
                false,
                List.of("USER"));
        secondUser = repository.createAccount(secondUser);

        secondUser.setFirstName("secondtest");
        secondUser.setLastName("dummy");
        secondUser.setBio("Hello");
        secondUser.setProficiency(new Proficiency(1,"Beginner", 5,new Language(1,"Java")));
        secondUser.setSchedule(List.of(new Schedule(1, DayOfWeek.MONDAY, "Morning")));
        AppUser secondProfileAdded = repository.createProfile(secondUser);

        AppUser thirdUser = new AppUser(0,"fakeprofile-" +new Random().nextInt(1000) +"@user.com",
                "P@ssw0rd!",
                false,
                List.of("USER"));
        thirdUser = repository.createAccount(thirdUser);

        thirdUser.setFirstName("thirdtest");
        thirdUser.setLastName("dummy");
        thirdUser.setBio("Hello");
        thirdUser.setProficiency(new Proficiency(1,"Beginner", 5,new Language(2,"C")));
        thirdUser.setSchedule(List.of(new Schedule(1, DayOfWeek.MONDAY, "Morning")));
        AppUser thirdProfileAdded = repository.createProfile(thirdUser);

        List<AppUser> shouldFindMatch = repository.displayMatches(firstProfileAdded);
        assertEquals(2, shouldFindMatch.size());
    }

    @Test
    void shouldFindById() {
        AppUser shouldFind = repository.findById(2);

        assertNotNull(shouldFind);
        assertEquals("morgan@oliver.com", shouldFind.getUsername());

    }

    @Test
    void shouldNotFindById() {
        AppUser shouldNotFind = repository.findById(10);
        assertNull(shouldNotFind);
    }


    @Test
    void shouldCreateNewUser() {
    AppUser newUser = new AppUser(4,"fake@user.com",
            "P@ssw0rd!",
           false,
            List.of("USER"));

    AppUser testDummy = repository.createAccount(newUser);
    assertNotNull(testDummy);
    }

    @Test
    void shouldAddProfileToAppUser() {

        AppUser newUser = new AppUser(0,"fakeprofile-" +new Random().nextInt(1000) +"@user.com",
                "P@ssw0rd!",
                false,
                List.of("USER"));
        newUser = repository.createAccount(newUser);

        newUser.setFirstName("test");
        newUser.setLastName("dummy");
        newUser.setBio("Hello");
        newUser.setProficiency(new Proficiency(1,"Beginner", 5,new Language(1,"Java")));
        newUser.setSchedule(List.of(new Schedule(1, DayOfWeek.MONDAY, "Morning")));
        AppUser profileAdded = repository.createProfile(newUser);
        assertNotNull(profileAdded);

    }

    @Test
    void shouldUpdateSchedule() {

        AppUser testUser = repository.findById(5);
        testUser.setSchedule(List.of(new Schedule(1, DayOfWeek.MONDAY, "Morning")));
        assertTrue(repository.updateSchedule(testUser));

    }



    @Test
    void shouldDelete(){
        assertTrue(repository.deleteById(4));
        assertFalse(repository.deleteById(4));
    }





}
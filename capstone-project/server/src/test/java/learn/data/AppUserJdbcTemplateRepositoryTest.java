package learn.data;

import learn.App;
import learn.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;

import java.util.ArrayList;
import java.util.List;

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
        AppUser newUser = new AppUser(5,"fakeprofile@user.com",
                "P@ssw0rd!",
                false,
                List.of("USER"));


//        AppUser testDummy = repository.createAccount(newUser);
        newUser.setFirstName("test");
        newUser.setLastName("dummy");
        newUser.setBio("Hello");
        newUser.setLanguage(newUser.getLanguage());
        newUser.setProficiency(newUser.getProficiency());
        newUser.setSchedule(newUser.getSchedule());
        AppUser profileAdded = repository.createProfile(newUser);
        assertNotNull(profileAdded);

    }



    @Test
    void shouldDelete(){
        assertTrue(repository.deleteById(4));
        assertFalse(repository.deleteById(4));
    }




}
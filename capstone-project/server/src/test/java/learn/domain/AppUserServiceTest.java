package learn.domain;

import learn.App;
import learn.data.AppUserRepository;
import learn.models.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

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

    }

//    @Test
//    void shouldNotCreateUserIfPasswordIsInvalid() {
//    AppUser newUser = new AppUser(5,"fake2@user.com",
//            "testtwo",
//            "dummytwo",
//            "hi",
//            "hello, I am not real",false, List.of("USER"));
//
//    Result<AppUser> result = service.create(newUser);
//    assertEquals(1, result.getMessages().size());
//
//
//}

}
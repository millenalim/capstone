package learn.domain;

import learn.App;
import learn.data.AppUserRepository;
import learn.domain.ActionStatus;
import learn.domain.Result;
import learn.models.AppUser;
import learn.models.Language;
import learn.models.Proficiency;
import learn.models.Schedule;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository repository;
    private final PasswordEncoder encoder;
    public AppUserService(AppUserRepository repository,
                          PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public List<AppUser> findAll() {return repository.findAll();}

    public List<AppUser> findAllUsers() {return repository.findAllUsers();}

    public AppUser findById(int id) {return repository.findById(id);}

    public List<AppUser> displayMatches(AppUser user) {return repository.displayMatches(user);}

    public AppUser findByUsername(String username){return repository.findByUsername(username); }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return appUser;
    }


    public Result<AppUser> createAccount(String username, String password) {
        Result<AppUser> result = validate(username, password);
        if (!result.isSuccess()) {
            return result;
        }
        password = encoder.encode(password);

        AppUser appUser = new AppUser(0, username, password, true, List.of("USER"));

        try {
            appUser = repository.createAccount(appUser);
            result.setPayload(appUser);
        } catch (DuplicateKeyException e) {
            result.addMessage(ActionStatus.INVALID, "The provided username already exists");
        }

        return result;
    }

    public Result<AppUser> createProfile(AppUser appUser) {
        Result<AppUser> result = validateFields(appUser.getFirstName(), appUser.getLastName(), appUser.getBio(), appUser.getProficiency(),appUser.getSchedule());
        if(!result.isSuccess()) {
            return result;
        }

        try {
            appUser = repository.createProfile(appUser);
            result.setPayload(appUser);
        } catch(DataAccessException e) {
            result.addMessage(ActionStatus.INVALID, "Unable to create profile");
        }
        return result;
    }

    public boolean deleteById(int appUserId){return repository.deleteById(appUserId);}

    private Result<AppUser> validateFields(String firstName, String lastName, String bio, Proficiency proficiency, List<Schedule> schedule) {
        Result<AppUser> result = new Result<>();
         if (firstName.isBlank() || firstName.isEmpty()) {
            result.addMessage(ActionStatus.INVALID, "First name is required");
            return result;
        }

        if(lastName.isBlank() || lastName.isEmpty()) {
            result.addMessage(ActionStatus.INVALID, "Last name is required");
            return result;
        }


        if(proficiency == null) {
            result.addMessage(ActionStatus.INVALID, "Please select a proficiency level");
            return result;
        }

        if(schedule == null || schedule.isEmpty()) {
            result.addMessage(ActionStatus.INVALID, "Please select a schedule");
            return result;
        }

        return result;
    }

    private Result<AppUser> validate(String username, String password) {


        Result<AppUser> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addMessage(ActionStatus.INVALID, "username is required");
            return result;
        }


        if (password == null) {
            result.addMessage(ActionStatus.INVALID, "password is required");
            return result;
        }

        if (username.length() > 50) {
            result.addMessage(ActionStatus.INVALID, "username must be less than 50 characters");
        }

        if (!isValidPassword(password)) {
            result.addMessage(ActionStatus.INVALID,
                    "password must be at least 8 character and contain a digit," +
                            " a letter, and a non-digit/non-letter");
        }

        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        return digits > 0 && letters > 0 && others > 0;
    }
}

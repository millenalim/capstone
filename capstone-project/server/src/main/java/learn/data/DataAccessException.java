package learn.data;

import java.util.Date;

public class DataAccessException extends Exception{

    public DataAccessException(String message) {
        super(message);
    }

    public DataAccessException(String message, Throwable cause) {
        super(message, cause);
    }
}

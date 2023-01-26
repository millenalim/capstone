import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import AuthContext from '../../context/AuthContext';
import MatchCard from './MatchCard';

function MatchCardFactory({ currentUser, setCurrentUser, users, setAllUsers, messages, setMessages, makeId, parseResponseMessage }) {

    const navigate = useNavigate();

    const [schedules, setSchedules] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [updatedMatches, setUpdatedMatches] = useState([]);
    const [updatedLanguageMatches, setLanguageMatches] = useState([]);

    const auth = useContext(AuthContext);

    useEffect(() => {
        getMatches();
    }, []);

    useEffect(() => {
        getSchedules();
        getLanguages();
    }, []);
    

    useEffect(() => {
        let updatedUsers = users.map(user => {
            let updatedUser = {...user};
            let schedule = {};
            if (schedules.length > 0) {
                schedule = schedules.filter(schedule => schedule.scheduleId === user.schedule[0])[0];
            }
            updatedUser["scheduleName"] = schedule;
            return updatedUser;
        });
        setUpdatedMatches(updatedUsers);
    }, [schedules]);

    useEffect(() => {
        let updatedUsers = users.map(user => {
            let updatedUser = {...user};
            let language = {};
            if (languages.length > 0) {
                language = languages.filter(language => language.languageId === user.languageId)[0];
            }
            updatedUser["language"] = language;
            return updatedUser;
        });
        setLanguageMatches(updatedUsers);
    }, [languages]);


    function getSchedules() {
        fetch("http://localhost:8080/schedule/")
        .then(response => response.json())
        .then(data => setSchedules(data));
    }

    function getLanguages() {
        fetch("http://localhost:8080/language/")
        .then(response => response.json())
        .then(data => setLanguages(data))
    }

    const getMatches = () => {
        fetch("http://localhost:8080/discover/" + auth.currentUser.appUserId, {
            headers: {
                Authorization: "Bearer " + auth.currentUser.token
            }
        })
        .then(response => response.json())
        .then(data => data ? setAllUsers(data) : null)
        .catch(error => setMessages([...messages, { id: makeId(), type: "failure", text: error.message }]));
    }

    const messageMatch = (users) => {
        setCurrentUser(users);
        navigate("/messages");
    }

    const createCardFactory = () => {
        if (updatedMatches.length > 0) {
            let matchCardArray = updatedMatches.map(matchObj => {
                return (<MatchCard key={matchObj.appUserId + "-" + matchObj.username}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    messageMatch={messageMatch}
                    matchedUser={matchObj}
                    programmingLanguage={updatedLanguageMatches[0]}

                />)
            });
            
            return matchCardArray;
        }
    }
    return (
        <>
            <div className="row mt-4">
                {createCardFactory()}
            </div>
        </>
    );
}

export default MatchCardFactory
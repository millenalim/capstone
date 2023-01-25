import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import AuthContext from '../../context/AuthContext';
import MatchCard from './MatchCard';

function MatchCardFactory({ currentUser, setCurrentUser,  users, setAllUsers, messages, setMessages, makeId, parseResponseMessage}) {

    const navigate = useNavigate();


    const auth = useContext(AuthContext);

    useEffect(() => {
        getMatches();
    }, []);


    const getMatches = () => {
        fetch("http://localhost:8080/discover/" + auth.currentUser.appUserId, {
            headers: {
                Authorization: "Bearer " + auth.currentUser.token
            }
        })
        // .then(error => console.error(error))
        // .then(response => console.log(response))
        // .then(response => parseResponseMessage(response))
        .then(response => response.json())
        .then(data => data ? setAllUsers(data) : null)
        // .then(data => console.log(data))
        .catch(error => setMessages([...messages, { id: makeId(), type: "failure", text: error.message }])); 
    }

    const messageMatch = (users) => {
        setCurrentUser(users);
        navigate("/messages");
    }

    const createCardFactory = () => {
        if (users.length > 0) {
            let matchCardArray = users.map(matchObj => {
                return (<MatchCard key={matchObj.appUserId + "-" + matchObj.username}
                                    currentUser={currentUser}
                                    setCurrentUser={setCurrentUser}
                                    messageMatch={messageMatch}
                                    matchedUser = {matchObj}
                                    
                />)
            });
            console.log(matchCardArray)
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
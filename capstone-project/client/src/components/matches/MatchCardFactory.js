import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import AuthContext from '../../context/AuthContext';
import MatchCard from './MatchCard';

function MatchCardFactory({matches, setMatches, setCurrentMatch, currentMatch, messages, setMessages, makeId, parseResponseMessage}) {

    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    useEffect(() => {
        getMatches();
    }, []);


    const getMatches = () => {
        fetch("http://localhost:8080/discover", {
            headers: {
                Authorization: "Bearer " + auth.currentUser.token
            }
        })
        .then(response => parseResponseMessage(response))
        .then(data => data ? setMatches(data) : null)
        .catch(error => setMessages([...messages, { id: makeId(), type: "failure", text: error.message }])); 
    }

    const messageMatch = (match) => {
        setCurrentMatch(match);
        navigate("/messages");
    }

    const createCardFactory = () => {
        if (matches.length > 0) {
            let matchCardArray = matches.map(matchObj => {
                return (<MatchCard key={matchObj.userId + "-" + matchObj.username}
                                    match={matchObj}
                                    messageMatch={messageMatch}
                                    currentMatch={currentMatch}
                                    setCurrentMatch={setCurrentMatch}
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
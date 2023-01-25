import { useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import AuthContext from '../../context/AuthContext';
import MatchCard from './MatchCard';

function MatchCardFactory({ currentUser, matches, setMatches, setCurrentMatch, currentMatch, messages, setMessages, makeId, parseResponseMessage}) {

    const navigate = useNavigate();

    // const { appUserId } = useParams()

    const auth = useContext(AuthContext);

    useEffect(() => {
        getMatches();
    }, []);


    const getMatches = () => {
        fetch("http://localhost:8080/discover/")
        .then(error => console.error(error))
        // .then(response => console.log(response))
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
                return (<MatchCard key={matchObj.appUserId + "-" + matchObj.username}
                                    match={matchObj}
                                    messageMatch={messageMatch}
                                    currentMatch={currentMatch}
                                    setCurrentMatch={setCurrentMatch}
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
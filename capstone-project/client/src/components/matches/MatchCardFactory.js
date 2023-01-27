import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import AuthContext from '../../context/AuthContext';
import MatchCard from './MatchCard';
import Talk from 'talkjs';

function MatchCardFactory({ currentUser, setCurrentUser, users, setAllUsers, messages, setMessages, makeId, schedules, languages }) {

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
            .then(response => response.json())
            .then(data => {
                if (data) {

                     let allUsers = data.map(user => {
                        let updatedUser = { ...user };
    
                        let language = {};
                        let schedule = {};
    
                        if (languages.length > 0) {
                            language = languages.filter(language => language.languageId === user.languageId)[0];
                        }
                        
                        if (schedules.length > 0) {
                            schedule = schedules.filter(schedule => schedule.scheduleId === user.schedule[0])[0];
                        }
                        
                        updatedUser["scheduleName"] = schedule;
                        updatedUser["language"] = language;

                        return updatedUser

                    })

                    setAllUsers(allUsers);

                } else {
                    return null;
                }
            })
            .catch(error => setMessages([...messages, { id: makeId(), type: "failure", text: error.message }]));
    }

    const messageMatch = (users) => {
        const me = new Talk.User({
            id: '1',
            name: 'Millena Lim',
            email: 'millena@lim.com',
            welcomeMessage: 'Hello!',
            role: 'default',
          });
    
          const other = new Talk.User({
            id: '4',
            name: 'John Williams',
            email: 'john@williams.com',
            welcomeMessage: 'Hello!',
            role: 'default',
          });
    
          const session = new Talk.Session({
            appId: 'tDb6Ljie',
            me: me,
          });

        const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
        );
        conversation.setParticipant(me);
        conversation.setParticipant(other);
        const popup = session.createPopup();
        popup.select(conversation);
        popup.mount({ show: false });
    }

    const createCardFactory = () => {
        if (users.length > 0) {
            let matchCardArray = users.map(matchObj => {
                return (<MatchCard key={matchObj.appUserId + "-" + matchObj.username}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    messageMatch={messageMatch}
                    matchedUser={matchObj}
                    
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
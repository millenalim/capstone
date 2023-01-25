
import { useContext, useEffect } from "react";
import UsersSingleCard from "./UsersSingleCard";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";

function CardFactory({ currentUser, setCurrentUser, messages, setMessages }) {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        fetch("http://localhost:8080/user/" + currentUser.appUserId ,{
            headers: {
                Authorization: "Bearer " + auth.currentUser.token
            }
        })
        .then(response => response.json())
        .then(data => setCurrentUser(data))
        .catch(error => setMessages([...messages, { type: "failure", text: error.message}]));
    }

    // const editUser = (user) => {
    //     setCurrentUser(user);
    //     navigate("/profile_form");
    // }

    // const deleteUser = (user) => {
    //     setCurrentUser(user);
    //     navigate("/confirm-delete");
    // }

    const createCardFactory = () => {
        if (currentUser.length > 0) {
            let userCardArray = currentUser.map(userObj => {
                return (<UsersSingleCard key={userObj.username + "-" + userObj.firstName + "-" + userObj.lastName}
                                // user={userObj}
                                // editUser={editUser}
                                // deleteUser={deleteUser}
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}
                        />)
            });
            return userCardArray;
        }
    }

  return (
    <>
        <div className="row mt-4">{createCardFactory}</div>
    </>
  )
}
export default CardFactory;
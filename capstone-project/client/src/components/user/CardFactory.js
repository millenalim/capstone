import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import UsersSingleCard from "./UsersSingleCard";
import AuthContext from "../../context/AuthContext";

function CardFactory({ currentUser, setCurrentUser, appUser, setAppUser, messages, setMessages }) {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        fetch("http://localhost:8080/user/" + auth.currentUser.appUserId, {
            headers: {
                Authorization: "Bearer " + auth.currentUser.token
            }
        })
        .then(response => response.json())
        .then(data => data ? setAppUser(data) : null)
        // .then(data => console.log(data))
        .catch(error => setMessages([...messages, { type: "failure", text: error.message}]));
    }

    const editUser = (appUser) => {
        setCurrentUser(appUser);
        navigate("/profile_form");
    }

    // const deleteUser = (user) => {
    //     setCurrentUser(user);
    //     navigate("/confirm-delete");
    // }

    const createCardFactory = () => {
        if (appUser) {
                return (<UsersSingleCard key={appUser.appUserId + "-" + appUser.username}
                                editUser={editUser}
                                // deleteUser={deleteUser}
                                user={appUser}
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}
                        />);
            };
            // console.log(userCardArray);
            return null;
        }
  return (
    <>
        <div className="row mt-4">{createCardFactory()}</div>
    </>
  )
}
export default CardFactory;
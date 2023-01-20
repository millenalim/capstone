import { useEffect } from "react";
import UsersSingleCard from "./UsersSingleCard";

function CardFactory({ allUsers, setAllUsers, currentUser, setCurrentUser, messages, setMessages }) {
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        fetch("http://localhost:8080/users")
        .then(response => response.json())
        .then(data => setAllUsers(data))
        .catch(error => setMessages([...messages, { type: "failure", text: error.message}]));
    }

    const editUser = (user) => {
        setCurrentUser(user);
        navigate("/profile_form");
    }

    const deleteUser = (user) => {
        setCurrentUser(user);
        navigate("/confirm-delete");
    }

    const createCardFactory = () => {
        if (allUsers.length > 0) {
            let userCardArray = allUsers.map(userObj => {
                return (<UsersSingleCard key={userObj.username + "-" + userObj.firstName + "-" + userObj.lastName}
                                user={userObj}
                                editUser={editUser}
                                deleteUser={deleteUser}
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
import { useEffect, useState} from 'react';
import { Link,useNavigate } from "react-router-dom";

function TableOfUsers() {
    const [users, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/users/')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }

            })
            .then(data => setAllUsers(data))
            .catch(console.log())
    }, []); 


    const handleDeleteUser = (appUserId) => {
        const user = users.find(user => user.appUserId === appUserId);
        if (window.confirm(`Delete user ${user.firstName}-${user.lastName}?`)) {
            const init = {
                method: 'DELETE'
            };

            fetch(`http://localhost:8080/api/user/${appUserId}`, init)
                .then(response => {
                    if (response.status === 204) {
                        const newUsers = users.filter(user => user.appUserId !== appUserId);

                        setAllUsers(newUsers);


                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .catch(console.log);

        }


    };

  return (
    <>
    <h2 className="mt-4 mb-4" style={{color: "white", textAlign: "center"}}>Users</h2>
    <form className="d-flex mb-4" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    <div className="col mx-4">
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                <th scope="col">Username</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                <tr key={user.appUserId}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                    <div className="float-right mr-2">
                        <Link className="btn btn-outline-light" to={`/users/edit/${user.appUserId}`}>
                            <i className="bi bi-pencil-square"></i> Edit
                        </Link>
                        <button className="btn btn-outline-danger" onClick={() => handleDeleteUser(user.appUserId) }>
                            <i className="bi bi-trash"></i> Delete
                        </button>    
                    </div>
                </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
  );
}

export default TableOfUsers;
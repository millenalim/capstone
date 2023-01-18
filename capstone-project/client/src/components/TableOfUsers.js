// import { useEffect, useState} from `react`;
// import { useNavigate } from "react-router-dom";

function TableOfUsers() {
    // const [users, setAllUsers] = useState([]);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     fetch("http://localhost:8080/users")
    //     .then(response => response.json())
    //     .then(data => setAllUsers(data));
    // }, []);

  return (
    <>
    <h2 className="mt-4 mb-4" style={{color: "white", textAlign: "center"}}>Users</h2>
    <table className="table table-dark table-striped">
        <thead>
            <tr>
            <th scope="col">Username</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            {/* <td>{user.userId}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td> */}
            <td>email</td>
            <td>first name</td>
            <td>last name</td>
            <td>
                <div className="float-right mr-2">
                    <button type="button" className="btn btn-outline-light">Edit</button>
                    <button type="button" className="btn btn-outline-danger">Delete</button>    
                </div>
            </td>
            </tr>
        </tbody>
    </table>
    </>
  );
}

export default TableOfUsers;
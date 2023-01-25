import { useState, useEffect } from "react";

function UsersSingleCard({ currentUser, setCurrentUser }) {

    const [localUser] = useState({...currentUser});

    useEffect(() => {
        setCurrentUser({})
    },[])

  return (
    <>
        <div className="row mt-5">
            <div className="col-4 offset-4">
                <div className="card">
                <div className="card-body">
                    <p className="mb-1">{currentUser.firstName + " " + currentUser.lastName}</p>
                    <p>Language: {currentUser.language}</p>
                    <p>Proficiency: {currentUser.proficiency}</p>
                    <p>Availability: {currentUser.availability}</p>
                    <p>Schedule: {currentUser.schedule}</p>
                </div>
                <div className="btn-toolbar position-relative py-4" role="toolbar">
                    <div className="btn-group me-2 position-absolute top-0 start-50 translate-middle" role="group">
                        {/* <button type="button" className="btn btn-outline-dark" onClick={() => editUser(currentUser)}>Edit</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => deleteUser(currentUser)}>Delete</button> */}
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UsersSingleCard;
import { useState, useEffect } from "react";
import CardInner from "./CardInner";

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
                    <CardInner currentUser={localUser} />
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
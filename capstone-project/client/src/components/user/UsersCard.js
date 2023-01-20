import { useState, useEffect } from "react";
import CardInner from "./CardInner";

function UsersCard({ currentUser, setCurrentUser }) {

    const [localUser] = useState({...currentUser});

    useEffect(() => {
        setCurrentUser({})
    }, [])

  return (
    <>
        <div className="row mt-5">
            <div className="col-4 offset-4">
                <div className="card">
                    <CardInner currentUser={localUser} />
                </div>
            </div>
        </div>
    </>
  )
}

export default UsersCard;
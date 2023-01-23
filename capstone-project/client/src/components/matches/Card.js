import { useNavigate } from "react-router-dom";

function Card({match}) {
    const navigate = useNavigate;

    const directToChat = () => {
        navigate("/messages")
    }

    return(
        <>
        <div className="col-4">
            <div className="card mb-4">
                <div className="card-header">
                    <p className="h4">Match</p>
                </div>
                <div className="card-body">
                    <p>First Name: </p>
                    <p>Last Name: </p>
                    <p>Bio: </p>
                <button type="button" className="btn btn-primary" onClick={directToChat}/>
                </div>
            </div>
        </div>
        </>
    )

}

export default Card;
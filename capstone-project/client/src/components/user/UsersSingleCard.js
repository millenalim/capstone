function UsersSingleCard({ user, editUser }) {
    
  return (
    <>
        <div className="row mt-5">
            <div className="col-4 offset-4">
                <div className="card">
                    <div className="card-header">
                        <p className="h3">{user.firstName + " " + user.lastName}</p>
                    </div>
                <div className="card-body">
                    <p><span className="fw-bold">Language:</span> {user.languageId}</p>
                    <p><span className="fw-bold">Proficiency:</span> {user.proficiencyLevel}</p>
                    <p><span className="fw-bold">Availability:</span> {user.scheduleN
                    }</p>
                    <p><span className="fw-bold">Bio:</span> {user.bio}</p>
                </div>
                <div className="mb-3 col text-center">
                 <button type="button" className="btn btn-primary" onClick={() => editUser(user)}>Edit</button>
                </div>
                
                </div>
            </div>
        </div>
    </>
  )
}

export default UsersSingleCard;
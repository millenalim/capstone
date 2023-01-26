function UsersSingleCard({ user, editUser }) {
    console.log("usc",user);
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
                    <p><span className="fw-bold">Availability:</span> {user.schedule}</p>
                    <p><span className="fw-bold">Bio:</span> {user.bio}</p>
                </div>
                <div className="mb-3 col text-center">
                 <button type="button" className="btn btn-primary" onClick={() => editUser(user)}>Edit</button>
                </div>
                {/* <div className="btn-toolbar position-relative py-4" role="toolbar">
                    <div className="btn-group me-2 position-absolute top-0 start-50 translate-middle" role="group">
                        <button type="button" className="btn btn-outline-danger" onClick={() => deleteUser(currentUser)}>Delete</button>
                    </div>
                </div> */}
                </div>
            </div>
        </div>
    </>
  )
}

export default UsersSingleCard;
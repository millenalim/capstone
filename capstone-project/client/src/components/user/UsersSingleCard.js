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
                    <p>Language: {user.language.language}</p>
                    <p>Proficiency: {user.proficiencyLevel}</p>
                    <p>Availability: {user.scheduleName.dayOfWeek+"-"+user.scheduleName.availability}</p>
                    <p>Bio: {user.bio}</p>
                </div>
                <div>
                 <button type="button" className="btn btn-primary" onClick={() => editUser(user)}>Edit</button>
                </div>
                
                </div>
            </div>
        </div>
    </>
  )
}

export default UsersSingleCard;
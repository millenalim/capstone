function MatchCard({ matchedUser, messageMatch }) {
  return (
    <>
      <div className="col-4">
        <div className="card">
          <div className="card-header">
            <p className="h3">
              {matchedUser.firstName + " " + matchedUser.lastName}
            </p>
          </div>
          <div className="card-body">
            <p className="mb-1">
              {matchedUser.firstName} {matchedUser.lastName}
            </p>
            <p>Language: {matchedUser.languageId}</p>
            <p>Proficiency: {matchedUser.proficiencyLevel}</p>
            <p>Availability: {matchedUser.schedule}</p>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => messageMatch(matchedUser)}
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchCard;

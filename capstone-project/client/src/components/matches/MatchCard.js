function MatchCard({ matchedUser, messageMatch }) {
  return (
    <>
      <div className="col-4">
        <div className="card h-100">
          <div className="card-header card text-center">
            <p className="h3">
              {matchedUser.firstName + " " + matchedUser.lastName}
            </p>
          </div>
          <div className="card-body card text-center">
            <p>Language: {matchedUser.languageId}</p>
            <p>Proficiency: {matchedUser.proficiencyLevel}</p>
            <p>Availability: {matchedUser.schedule}</p>
            <p>Bio: {matchedUser.bio}</p>
          </div>
          <div className="col text-center">
            <button
              type="button"
              className="btn btn-primary"
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

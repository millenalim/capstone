function MatchCard({ matchedUser, messageMatch,programmingLanguage }) {
  return (
    <>
      <div className="col-4 mb-5">
        <div className="card h-100 ">
          <div className="card-header card text-center">
            <p className="h3">
              {matchedUser.firstName + " " + matchedUser.lastName}
            </p>
          </div>

          <div className="card-body">
            <p><span className="fw-bold">Language:</span> {matchedUser.language.language}</p>
            <p><span className="fw-bold">Proficiency:</span> {matchedUser.proficiencyLevel}</p>
            <p><span className="fw-bold">Availability:</span> {matchedUser.scheduleName.dayOfWeek +"-"+ matchedUser.scheduleName.availability}</p>
            <p><span className="fw-bold">Bio:</span> {matchedUser.bio}</p>
          </div>
          <div className="mb-3 col text-center">
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
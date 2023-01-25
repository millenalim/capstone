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
<<<<<<< HEAD
          <div className="card-body">
            <p>Language: {matchedUser.language.language}</p>
=======
          <div className="card-body card text-center">
            <p>Language: {matchedUser.languageId}</p>
>>>>>>> 2e5d9a50f11a9516ec41812491058963bdad9313
            <p>Proficiency: {matchedUser.proficiencyLevel}</p>
            <p>Availability: {matchedUser.scheduleName.availbility + matchedUser.scheduleName.dayOfWeek}</p>
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

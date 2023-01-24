function MatchCard({ matches, messageMatch}) {
  return (
    <>
      <div className="col-4">
        <div className="card-header">
          <p className="h3">
            {matches.firstName + " " + matches.lastName}
          </p>
        </div>
        <div className="card-body">
          <p className="mb-1">
            {matches.firstName} {matches.lastName}
          </p>
          <p>Language: {matches.language}</p>
          <p>Proficiency: {matches.proficiency}</p>
          <p>Availability: {matches.availability}</p>
          <p>Schedule: {matches.schedule}</p>
        </div>
        <div>
            <button type="button" className="btn btn-dark" onClick={() => messageMatch(matches)}>Message</button>
        </div>
      </div>
    </>
  );
}

export default MatchCard;

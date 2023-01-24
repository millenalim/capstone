import React from 'react'

function CardInner({ currentUser }) {

  return (
    <>
      <div className="card-body">
          <p className="mb-1">{currentUser.firstName + " " + currentUser.lastName}</p>
          <p>Language: {currentUser.language}</p>
          <p>Proficiency: {currentUser.proficiency}</p>
          <p>Availability: {currentUser.availability}</p>
          <p>Schedule: {currentUser.schedule}</p>
      </div>
    </>
  )
}

export default CardInner;
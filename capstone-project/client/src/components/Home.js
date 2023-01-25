import React from 'react'

function Home() {

    const headerText = `<Hooked />`;
  return (
    <div className="mt-4 text-center text-white">
        <h1 className="display-1">{headerText}</h1>
        <p className="mt-5">Let rubber duckies be a thing of the past...</p>
        <img className="img-fluid mt-5" src={process.env.PUBLIC_URL + "/images/home.svg"} />
    </div>
  );
}

export default Home;
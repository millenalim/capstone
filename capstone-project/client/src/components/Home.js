import Typical from "react-typical";

function Home() {

    const headerText = `<Hooked />`;
  return (
    <div className="mt-4 text-center text-white">
        <h1 className="display-1 fw-bold">{headerText}</h1>
        {/* <div className="display-1 fw-bold">
          <Typical className="typical"
                  steps={['<Hooked />', 2500, '', 500]}
                  loop={Infinity}
                  />
        </div> */}
        <div className="mt-5">
        <Typical className="typical"
                  steps={['Discover your coding buddy and get <Hooked />', 3500]}
                  loop={Infinity}
                  />
        </div>
        {/* <p className="mt-5">Let rubber duckies be a thing of the past...</p> */}
        <img className="img-fluid mt-3" src={process.env.PUBLIC_URL + "/images/home.png"} />
    </div>
  );
}

export default Home;
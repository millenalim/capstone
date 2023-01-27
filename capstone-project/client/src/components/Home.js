import Typical from "react-typical";
import ParticlesBg from "particles-bg";

function Home() {

    const headerText = `<Hooked />`;
  return (
    <>
      <div className="row banner">
        <ParticlesBg
              type="polygon"
              bg={true}
            />
      <header id="home">
        <div className="mt-5 text-center text-white">
            <h1 className="display-1 fw-bold">{headerText}</h1>
            <div>
              <p className="mt-5 fs-6 text-white">A safe space to meet developers <br></br>to learn from one another and collaborate</p>
            </div>
            <div className="mt-5 fs-5">
            <Typical className="typical"
                      steps={['Discover your coding buddy and get <Hooked />', 8000]}
                      loop={Infinity}
                      />
            </div>
        </div>
      </header>
      </div>
    </>
  );
}

export default Home;
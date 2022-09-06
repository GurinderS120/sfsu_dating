import Navbar from "./Navbar";
import HomeImg from "../Images/pexels-pixabay-33109.jpg";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen">
        <img
          className="h-full w-full object-cover"
          src={HomeImg}
          alt="Background-img"
        />
      </div>
    </>
  );
};

export default Home;

import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar/>
            <Banner/>
            <Footer/>
        </div>
    );
};

export default Home;
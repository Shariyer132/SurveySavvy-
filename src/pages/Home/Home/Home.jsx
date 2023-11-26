import Footer from "../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import Faq from "../Faq/Faq";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Banner/>
            <FeaturedSection/>
            <Testimonials/>
            <Faq/>
            <Footer/>
        </div>
    );
};

export default Home;
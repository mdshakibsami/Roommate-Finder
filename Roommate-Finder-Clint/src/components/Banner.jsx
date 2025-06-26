import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useTheme } from "../hooks/use-theme";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import sliderImg1 from "../assets/1.jpg";
import sliderImg2 from "../assets/2.jpg";
import sliderImg3 from "../assets/3.jpg";
import sliderImg4 from "../assets/4.jpg";

const Banner = () => {
  const { theme } = useTheme();
  const [text] = useTypewriter({
    words: [
      "Looking for a Roommate?",
      "Want to Share Your Space?",
      "Need a Compatible Match?",
      "Safe & Verified Roommates",
    ],
    loop: true,
    delaySpeed: 1500,
    deleteSpeed: 50,
    typeSpeed: 100,
  });
  const [titleText] = useTypewriter({
    words: ["Hassle-Free"],
    loop: false,
    delaySpeed: 1000,
    typeSpeed: 150,
  });

  return (
    <div
      className={`max-w-11/12 mx-auto px-4 py-12 ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left side - Motto and Typewriter */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="space-y-4">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              Find Your Perfect Roommate,{" "}
              <span className="text-[#3289c9]">{titleText}</span>
              <Cursor cursorColor="#3289c9" />
            </h1>
            <div
              className={`space-y-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <p className="text-lg">
                Discover like-minded roommates based on lifestyle, location, and
                budget.
              </p>
              <p className="text-lg">
                Browse verified listings or create your own with just a few
                clicks.
              </p>
              <p className="text-lg font-medium">
                Start your journey to comfortable shared living today.
              </p>
            </div>
          </div>

          <div
            className={`text-xl md:text-2xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } min-h-[60px] font-medium pt-4`}
          >
            <span>{text}</span>
            <Cursor cursorColor="#3289c9" />
          </div>

          <div className="flex gap-4 justify-center lg:justify-start">
            <button className="btn btn-primary bg-[#3289c9] text-white border-none hover:bg-[#2778b5]">
              Find Roommate
            </button>
            <button className="btn btn-outline border-[#3289c9] text-[#3289c9] hover:bg-[#3289c9] hover:text-white hover:border-[#3289c9]">
              List Your Space
            </button>
          </div>
        </div>

        {/* Right side - Slider */}
        <div className="lg:w-1/2">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="relative group">
                <img
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-lg brightness-75"
                  src={sliderImg1}
                  alt="Room interior"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                  <div
                    className={`text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300`}
                  >
                    <h3 className="text-2xl font-bold mb-2">
                      Modern Living Space
                    </h3>
                    <p>Find your perfect shared living environment</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative group">
                <img
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-lg"
                  src={sliderImg2}
                  alt="Shared living space"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">
                      Comfortable Spaces
                    </h3>
                    <p>Share your home with like-minded people</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative group">
                <img
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-lg"
                  src={sliderImg3}
                  alt="Cozy bedroom"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">Cozy Bedrooms</h3>
                    <p>Your private space in a shared environment</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative group">
                <img
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-lg"
                  src={sliderImg4}
                  alt="Community area"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">
                      Community Living
                    </h3>
                    <p>Build lasting friendships with your roommates</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Banner;

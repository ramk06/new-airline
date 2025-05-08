
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-airline-sky to-blue-400 text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Adventure</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Search flights to destinations across India and find the best deals on airfare
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;

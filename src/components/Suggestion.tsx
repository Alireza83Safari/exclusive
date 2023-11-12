import { Link } from "react-router-dom";

function Suggestion() {
  return (
    <div className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto col-span-10 py-8">
      <div className="w-full md:h-[500px] h-[600px] bg-black lg:px-16 px-5 grid md:grid-cols-2 grid-cols-1 md:py-0 py-10">
        <div className="md:my-16 my-4 md:order-1 order-2 text-center md:text-start">
          <p className="text-green">Categories</p>
          <h2 className="md:text-5xl sm:text-4xl text-3xl text-white font-semibold md:my-10 my-4">
            Enhance Your Music Experience
          </h2>
          <div className="flex md:justify-start justify-center md:my-14 my-10 bg-gradient-to-br">
            <div className="text-sm mr-2 bg-white rounded-full w-14 h-14 text-center">
              <p>23</p>
              <p>Hours</p>
            </div>
            <div className="text-sm mr-2 bg-white rounded-full w-14 h-14 text-center">
              <p>12</p>
              <p>minutes</p>
            </div>
            <div className="text-sm mr-2 bg-white rounded-full w-14 h-14 text-center">
              <p>48</p>
              <p>second</p>
            </div>
          </div>
          <Link
            to="/search/product?searchTerm=jbl"
            className="bg-green text-white px-10 py-3"
          >
            Buy Now!
          </Link>
        </div>
        <div className="md:w-full  m-auto md:h-[344px] h-[220px] md:order-2 order-1">
          <img src="/images/Suggestion.png" className="h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Suggestion;

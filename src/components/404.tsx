import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-20 relative text-center my-10">
      <h1 className=" text-8xl font-semibold mb-10">404 Not Found</h1>
      <p className="mb-10">
        Your visited page not found. You may go home page.
      </p>
      <Link to='/' className="bg-red text-white py-3 px-8 mt-10">
       Navigate To Home
      </Link>
    </section>
  );
}

export default NotFound;

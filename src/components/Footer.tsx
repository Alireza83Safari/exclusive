import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-black">
      <div className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto relative mt-20 py-16 md:flex justify-between grid sm:grid-cols-3 grid-cols-2">
        <div className="md:mx-1 mx-3 my-3">
          <ul className="text-white">
            <li className="text-2xl font-semibold mb-4">
              <Link to="contact">Exclusive</Link>
            </li>
            <li className="text-xl font-medium my-4">Subscribe</li>
            <li className="my-4">Get 10% off your first order</li>
          </ul>
          <div className="relative bg-black border border-borderColor">
            <input
              type="text"
              className="bg-black py-1 px-1 outline-none text-white"
              placeholder="Enter your email"
            />
            <img
              src="/images/send.png"
              alt=""
              className="w-5 h-5 absolute right-1 top-1"
            />
          </div>
        </div>
        <div className="text-white md:mx-1 mx-3 my-3">
          <ul>
            <li className="text-xl font-semibold mb-4">Support</li>
            <li className="my-4">Iran Karaj</li>
            <li className="my-4">alireza83safarii@gmail.com</li>
            <li className="my-4">+989102711361</li>
          </ul>
        </div>
        <div className="text-white md:mx-1 mx-3 my-3">
          <ul>
            <li className="text-xl font-semibold mb-4">
              <Link to="/account">Account</Link>
            </li>
            <li className="my-4">
              <Link to="/account">My Account</Link>
            </li>
            <li className="my-4">
              <Link to="/login">Login / Register</Link>
            </li>
            <li className="my-4">
              <Link to="/cart">Cart</Link>
            </li>

            <li className="my-4">
              <Link to="wishlist">Wishlist</Link>
            </li>
            <li className="my-4">
              <Link to="products">Shop</Link>
            </li>
          </ul>
        </div>
        <div className="text-white md:mx-1 mx-3 my-3">
          <ul>
            <li className="text-xl font-semibold mb-4">Quick Link</li>
            <li className="my-4">Privacy Policy</li>
            <li className="my-4">FAQ</li>
            <li className="my-4">
              <Link to="contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="text-white md:mx-1 mx-3 my-3">
          <p className="text-xl font-semibold mb-4">Download App</p>
          <p className="text-xs mb-4">Save $3 with App New User Only</p>
          <div className="grid grid-cols-2">
            <div>
              <img
                src="/images/Qr.png"
                alt="QR"
                className="w-20 h-20 object-contain"
              />
            </div>
            <div>
              <img
                src="/images/app.png"
                alt="QR"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <img
              src="/images/facebook.png"
              alt="facebook"
              className="w-6 h-6 object-contain"
            />
            <img
              src="/images/twiter.png"
              alt="twiter"
              className="w-6 h-6 object-contain"
            />
            <img
              src="/images/instagram.png"
              alt="instagram"
              className="w-6 h-6 object-contain"
            />
            <img
              src="/images/linkdin.png"
              alt="linkdin"
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pb-5">
        <img
          src="/images/copyright.png"
          className="w-5 h-5 mr-1"
          alt="copyright"
        />
        <p className="text-center text-borderColor">
          Copyright Rimel 2023. All right reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;

import { Suspense, lazy } from "react";
import Options from "../components/Options";
import { Link } from "react-router-dom";
import HeaderSkelton from "../skelton/HeaderSkelton";
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function About() {
  const userInfo = [
    {
      name: "Tom Cruise",
      job: "Founder & Chairman",
      img: "/images/user1.png",
    },
    {
      name: "Emma Watson",
      job: "Managing Director",
      img: "/images/user2.png",
    },
    {
      name: "Will Smith",
      job: "Product Designer",
      img: "/images/user3.png",
    },
  ];
  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-20 relative">
        <div className="grid lg:grid-cols-2 md:mb-20">
          <div className=" m-auto lg:pr-16 lg:order-1 order-2 px-2">
            <h1 className="text-5xl font-semibold">Our Story</h1>
            <p className="my-9">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <div className="lg:order-2 order-1">
            <img src="/images/about.png" alt="about" loading="lazy" />
          </div>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2 my-28 text-center">
          <div className="border border-borderColor py-6 px-3 m-3">
            <div className="bg-black w-14 h-14 flex justify-center items-center rounded-full border-8 border-borderColor m-auto">
              <img src="/images/about-home.png" alt="" className="w-6" />
            </div>
            <p className="mt-4 text-3xl font-bold">10.5K</p>
            <p className="mt-3">Free delivery for all orders over $140</p>
          </div>

          <div className="border border-borderColor py-6 px-3 m-3">
            <div className="bg-black w-14 h-14 flex justify-center items-center rounded-full border-8 border-borderColor m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="none"
                viewBox="0 0 40 40"
              >
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 37.273c9.54 0 17.273-7.734 17.273-17.273 0-9.54-7.733-17.273-17.273-17.273S2.728 10.461 2.728 20c0 9.54 7.733 17.273 17.272 17.273z"
                ></path>
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.75"
                  d="M25.091 14.547a3.637 3.637 0 00-3.272-1.818h-3.637a3.637 3.637 0 00-2.571 6.206A3.637 3.637 0 0018.182 20h3.637a3.637 3.637 0 012.57 6.206 3.637 3.637 0 01-2.57 1.065h-3.637a3.638 3.638 0 01-3.272-1.818M20 8.182v3.94m0 15.757v3.94"
                ></path>
              </svg>
            </div>
            <p className="mt-4 text-3xl font-bold">33k</p>
            <p className="mt-3">Monthly Products Sale</p>
          </div>

          <div className="border border-borderColor py-6 px-3 m-3">
            <div className="bg-black w-14 h-14 flex justify-center items-center rounded-full border-8 border-borderColor m-auto">
              <img src="/images/about-home.png" className="w-6" />
            </div>
            <p className="mt-4 text-3xl font-bold">45.5K</p>
            <p className="mt-3">Customer active in our site</p>
          </div>

          <div className="border border-borderColor py-6 px-3 m-3">
            <div className="bg-black w-14 h-14 flex justify-center items-center rounded-full border-8 border-borderColor m-auto">
              <img src="/images/about-bag-money.png" className="w-6" />
            </div>
            <p className="mt-4 text-3xl font-bold">25K</p>
            <p className="mt-4">Angual gross sale in our site</p>
          </div>
        </div>

        <div className="grid grid-cols-3 md:gap-x-6 gap-x-1 md:my-32 my-12">
          {userInfo?.map((info, index) => (
            <div key={index}>
              <div>
                <img src={info.img} />
              </div>
              <div>
                <h2 className="md:text-2xl text-base font-semibold md:mt-3 mt-1">
                  {info.name}
                </h2>
                <p className="md:mt-2 mt-1 md:text-base text-xs">{info.job}</p>
                <div className="flex mt-3">
                  <div className="mr-3">
                    <Link to="https://twitter.com/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <g clipPath="url(#clip0_246_4760)">
                          <path
                            fill="#000"
                            stroke="#fff"
                            strokeWidth="0.2"
                            d="M12.905 8.847h0a3 3 0 013-2.946l-3 2.946zm0 0l-.028 1.574m.028-1.574l-.028 1.574M4.758 7.81l.132.11c1.877 1.563 3.828 2.5 5.86 2.776 0 0 0 0 0 0l1.56.212L4.758 7.81zm0 0l-.03.169m.03-.17l-.03.17m0 0c-.302 1.67-.16 3.093.42 4.324.58 1.23 1.59 2.258 3.008 3.15h0M4.728 7.978l3.428 7.474m0 0l1.747 1.098.051-.082m-1.798-1.016l1.798 1.016m0 0l-.051.082a.5.5 0 01.028.828h0m.023-.91l-.023.91m0 0L8.339 18.54l-.224.163m1.816-1.326l-1.816 1.326m0 0l.277.017m-.277-.017l.277.017m0 0c.953.06 1.86.017 2.617-.133h0m-2.617.133l2.618-.133m0 0c2.379-.475 4.364-1.609 5.755-3.367m-5.755 3.367l5.755-3.367m-3.888-4.8a.499.499 0 01-.567.486l.567-.486zm3.888 4.8c1.39-1.758 2.18-4.133 2.18-7.079m-2.18 7.08l2.18-7.08m0 0c0-.145-.074-.357-.201-.585m.201.585l-.201-.585m0 0a3.244 3.244 0 00-.577-.737m.577.737l-.577-.737m0 0a3.222 3.222 0 00-2.262-.919l2.262.92zm2.33-1.282c.385-.054.831-.195 1.419-.527-.306 1.484-.484 2.157-1.152 3.072l-.019.027v.032c0 3.8-1.167 6.615-2.92 8.598-1.752 1.984-4.097 3.141-6.463 3.613-1.617.323-3.608.22-5.366-.142a12.953 12.953 0 01-2.376-.714c-.583-.245-1.06-.52-1.39-.807a16.054 16.054 0 002.014-.33c1-.233 2.128-.61 2.96-1.219l.115-.085-.12-.08a23.073 23.073 0 00-.136-.088c-.758-.494-2.317-1.51-3.331-3.371-1.065-1.953-1.54-4.854.182-9.091 1.665 1.917 3.359 3.234 5.081 3.94h0c.582.24.948.358 1.237.425.219.052.394.074.58.097l.18.023.295.04-.181-.18a4.8 4.8 0 018.213-3.244l.03.03h.042c.102-.001.206.002.313.006.244.008.503.017.794-.025z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_246_4760">
                            <path fill="#fff" d="M0 0H24V24H0z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  </div>

                  <div className="mr-3">
                    <Link to="https://www.instagram.com/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="#000"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M17 3H7a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4z"
                        ></path>
                        <path
                          stroke="#000"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 16a4 4 0 100-8 4 4 0 000 8v0z"
                        ></path>
                        <path
                          fill="#000"
                          d="M17.5 7.5a1 1 0 100-2 1 1 0 000 2z"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <div className="mr-3">
                    <Link to="https://www.linkedin.com/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#000"
                          d="M11.5 9.05c.917-.937 2.111-1.55 3.5-1.55a5.5 5.5 0 015.5 5.5v7.5h-2V13a3.5 3.5 0 10-7 0v7.5h-2V8h2v1.05zM4.5 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1 2h2v12.5h-2V8z"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Options />
      </section>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

export default About;

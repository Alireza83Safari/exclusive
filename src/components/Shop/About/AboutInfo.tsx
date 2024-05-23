const AboutInfo = () => {
  return (
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
  );
};

export default AboutInfo;

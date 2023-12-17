function Options() {
  const optiomsData = [
    {
      id: 1,
      title: "FREE AND FAST DELIVERY",
      img: "/images/truck.png",
      dec: "Free delivery for all orders over $140",
    },
    {
      id: 2,
      title: "24/7 CUSTOMER SERVICE",
      img: "/images/headPh.png",
      dec: "Friendly 24/7 customer support",
    },
    {
      id: 3,
      title: " MONEY BACK GUARANTEE",
      img: "/images/secure.png",
      dec: "We reurn money within 30 days",
    },
  ];
  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto relative my-20">
      <div className="grid grid-cols-3 lg:px-16">
        {optiomsData?.map((option) => (
          <div className="text-center sm:mx-3 mx-1 hover:opacity-70 duration-300" key={option.id}>
            <div className="flex justify-center items-center m-auto bg-black h-12 w-12 rounded-full border-8 border-borderColor">
              <img src={option.img} alt="s" className="w-6 h-6" />
            </div>
            <p className="lg:text-xl md:text-lg text-base font-semibold my-1 mt-3">
              {option.title}
            </p>
            <p className="md:text-base text-sm">{option.dec}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Options;

const AboutContent = () => {
  return (
    <div className="grid lg:grid-cols-2 md:mb-20">
      <div className=" m-auto lg:pr-16 lg:order-1 order-2 px-2">
        <h1 className="text-5xl font-semibold">Our Story</h1>
        <p className="my-9">
          Launced in 2015, Exclusive is South Asia’s premier online shopping
          makterplace with an active presense in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sallers and 300 brands and serves 3 millioons customers across
          the region.
        </p>
        <p>
          Exclusive has more than 1 Million products to offer, growing at a very
          fast. Exclusive offers a diverse assotment in categories ranging from
          consumer.
        </p>
      </div>
      <div className="lg:order-2 order-1">
        <img src="/images/about.png" alt="about" loading="lazy" />
      </div>
    </div>
  );
};

export default AboutContent;

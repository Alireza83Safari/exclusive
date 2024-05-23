import { Link } from "react-router-dom";
import TwitterIcon from "../../../assets/svgs/twitter.svg";
import LinkedinIcon from "../../../assets/svgs/linkedin.svg";
import InstagramIcon from "../../../assets/svgs/instagram.svg";

const AboutPersons = () => {
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
    <div className="grid grid-cols-3 md:gap-x-6 gap-x-1 md:my-32 my-12">
      {userInfo?.map((info, index) => (
        <div key={index}>
          <img src={info.img} />
          <div>
            <h2 className="md:text-2xl text-base font-semibold md:mt-3 mt-1">
              {info.name}
            </h2>
            <p className="md:mt-2 mt-1 md:text-base text-xs">{info.job}</p>
            <div className="flex mt-3">
              <div className="mr-3">
                <Link to="https://twitter.com/">
                  <img src={TwitterIcon} alt="Twitter Icon" />
                </Link>
              </div>

              <div className="mr-3">
                <Link to="https://www.instagram.com/">
                  <img src={InstagramIcon} alt="Twitter Icon" />
                </Link>
              </div>
              <div className="mr-3">
                <Link to="https://www.linkedin.com/">
                  <img src={LinkedinIcon} alt="Twitter Icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutPersons;

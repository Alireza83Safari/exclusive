import React, { Suspense, lazy, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner/Spinner";
import HeaderSkelton from "../skelton/HeaderSkelton";
const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));

type contactType = {
  name: string;
  email: string;
  phone: string;
  text: string;
};
function Contact() {
  const [contactInfo, setContactInfo] = useState<contactType>({
    name: "",
    email: "",
    phone: "",
    text: "",
  });

  const btnDisabled = useMemo(() => {
    if (
      contactInfo.name.length <= 2 ||
      contactInfo.email.length <= 2 ||
      contactInfo.text.length <= 8
    ) {
      return true;
    } else {
      return false;
    }
  }, [contactInfo]);

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };
  const contactHandler = () => {
    setContactInfo({ name: "", email: "", phone: "", text: "" });
    toast.success("Thank you, our colleagues will respond to you shortly.");
  };
  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto relative md:my-20">
        <div className="grid grid-cols-10 gap-x-10">
          <div className="md:col-span-3 col-span-10 shadow-md p-5 md:block grid sm:grid-cols-2">
            <div className="md:border-b border-borderColor md:pb-8 md:mr-0 sm:mr-4">
              <div className="flex items-center">
                <img src="/images/phone-contact.png" className="w-8 h-8 mr-3" />
                <p className="font-semibold text-lg">Call To Us</p>
              </div>
              <div>
                <p className="mt-5">We are available 24/7, 7 days a week.</p>
                <p className="mt-5">Phone: +8801611112222</p>
              </div>
            </div>

            <div className="md:pt-8 pt-12 sm:pt-0 md:ml-0 sm:ml-4">
              <div className="flex items-center">
                <img src="/images/name-image.png" className="w-8 h-8 mr-3" />
                <p className="font-semibold text-lg">Write To US</p>
              </div>
              <div>
                <p className="mt-5">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="mt-5">Emails: customer@exclusive.com</p>
                <p className="mt-5">Emails: support@exclusive.com</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 col-span-10 relative shadow-md p-4 md:mt-0 mt-12 pb-24">
            <form action="" className="grid grid-cols-3">
              <div className="mx-3">
                <input
                  type="text"
                  className="bg-gray py-2 px-5 w-full outline-none"
                  placeholder="Your Name"
                  name="name"
                  onChange={setInputValue}
                  value={contactInfo.name}
                />
              </div>
              <div className="mx-3">
                <input
                  type="text"
                  className="bg-gray py-2 px-5 w-full outline-none"
                  placeholder="Your Email"
                  name="email"
                  onChange={setInputValue}
                  value={contactInfo.email}
                />
              </div>
              <div className="mx-3">
                <input
                  type="number"
                  className="bg-gray py-2 px-5 w-full outline-none"
                  placeholder="Your Phone"
                  name="phone"
                  onChange={setInputValue}
                  value={contactInfo.phone}
                />
              </div>
              <div className="col-span-3 mx-3 mt-5">
                <textarea
                  rows={11}
                  className="w-full bg-gray outline-none px-4 py-2"
                  name="text"
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, text: e.target.value })
                  }
                  value={contactInfo.text}
                ></textarea>
              </div>
            </form>
            <button
              className="bg-red px-8 py-3 text-white absolute md:right-4 right-6 bottom-10 disabled:bg-gray"
              disabled={btnDisabled}
              onClick={contactHandler}
            >
              Send Message
            </button>
          </div>
        </div>
      </section>
      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Contact;

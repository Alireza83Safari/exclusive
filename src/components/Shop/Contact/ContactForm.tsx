import { useMemo, useState } from "react";
import toast from "react-hot-toast";

type contactType = {
  name: string;
  email: string;
  phone: string;
  text: string;
};

const ContactForm = () => {
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
  );
};

export default ContactForm;

import React from "react";

function Contact() {
  return (
    <section className="max-w-[1170px] mx-auto relative my-20">
      <div className="grid grid-cols-10 gap-x-10">
        <div className="col-span-3 shadow-md p-8">
          <div className="border-b border-borderColor pb-8">
            <div className="flex items-center">
              <img src="/images/phone-contact.png" className="w-8 h-8 mr-3" />
              <p className="font-semibold text-lg">Call To Us</p>
            </div>
            <div>
              <p className="mt-5">We are available 24/7, 7 days a week.</p>
              <p className="mt-5">Phone: +8801611112222</p>
            </div>
          </div>

          <div className="pt-8">
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
        <div className="col-span-7 relative shadow-md p-4">
          <form action="" className="grid grid-cols-3">
            <div className="mx-3">
              <input
                type="text"
                className="bg-gray py-2 px-5 w-full"
                placeholder="Your Name"
              />
            </div>
            <div className="mx-3">
              <input
                type="text"
                className="bg-gray py-2 px-5 w-full"
                placeholder="Your Email"
              />
            </div>
            <div className="mx-3">
              <input
                type="text"
                className="bg-gray py-2 px-5 w-full"
                placeholder="Your Phone"
              />
            </div>
            <div className="col-span-3 mx-3 mt-5">
              <textarea rows={11} className="w-full bg-gray"></textarea>
            </div>
          </form>
          <button className="bg-red px-8 py-3 text-white absolute right-4 bottom-10">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact;

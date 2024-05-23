const ContactInfo = () => {
  return (
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
  );
};

export default ContactInfo;

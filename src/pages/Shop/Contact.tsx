import { ShopLayout } from "../../layout";
import { ContactForm, ContactInfo } from "../../components";

function Contact() {
  return (
    <ShopLayout>
      <div className="grid grid-cols-10 gap-x-10">
        <ContactInfo />
        <ContactForm />
      </div>
    </ShopLayout>
  );
}

export default Contact;

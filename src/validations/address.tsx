import * as Yup from "yup";
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

const addressShema = Yup.object().shape({
  address: Yup.string().required().min(4).max(50),
  firstName: Yup.string().required().min(2).max(20),
  lastName: Yup.string().required().min(2).max(20),
  nationalCode: Yup.string().required(),
  phoneNumber: Yup.string().matches(phoneRegex).required(),
  plaque: Yup.number().required(),
  postalCode: Yup.string().matches(phoneRegex).required(),
});

export { addressShema };

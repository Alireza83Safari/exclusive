import * as Yup from "yup";

const addressShema = Yup.object().shape({
  address: Yup.string().required().min(4).max(50),
  firstName: Yup.string().required().min(2).max(20),
  lastName: Yup.string().required().min(2).max(20),
  nationalCode: Yup.string().required(),
  phoneNumber: Yup.string().required(),
  plaque: Yup.number().required(),
  postalCode: Yup.string().required(),
});

export { addressShema };

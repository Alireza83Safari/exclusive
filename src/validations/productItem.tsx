import * as Yup from "yup";

const productSchema = Yup.object().shape({
  colorId: Yup.string().required(),
  price: Yup.number().required(),
  productId: Yup.string().required(),
  quantity: Yup.number().required(),
  status: Yup.string().required(),
});
export { productSchema };

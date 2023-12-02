import * as Yup from "yup";

const productSchema = Yup.object().shape({
  brandId: Yup.string().required(),
  categoryId: Yup.string().required(),
  code: Yup.string().min(1).max(10).required(),
  description: Yup.string().min(10).max(100).required(),
  name: Yup.string().min(2).max(20).required(),
  shortDescription: Yup.string().min(10).max(100).required(),
});
export { productSchema };

import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required")
    .required(),
});

const registerSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required(),
});

export { loginSchema, registerSchema };

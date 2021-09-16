const { body } = require("express-validator");
const password = require("password-validator");

const userCheck = () => [
  body("email").notEmpty().isEmail().normalizeEmail(),
  body("password")
    .notEmpty()
    .custom((value) => {
      const passwordSchema = new password();
      passwordSchema.is().min(6).has().digits(1);
      return passwordSchema.validate(value);
    }),
];

module.exports = {
  userCheck: userCheck,
};

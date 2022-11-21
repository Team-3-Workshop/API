const { User } = require("../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = {
  login: async (req, res) => {
    const schema = {
      email: "email",
      password: {
        type: "string",
        singleLine: true,
      },
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email!",
        data: null,
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(400).json({
        success: false,
        message: "Invalid password!",
        data: null,
      });
    }

    res.status(200).json({
        success: true,
        message: "Login Success",
        data: user
    })
  },
};

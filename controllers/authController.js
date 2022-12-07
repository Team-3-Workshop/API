const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = {
  login: async (req, res, next) => {
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
      data: user,
    });

    next();
  },

  signup: async (req, res, next) => {
    const schema = {
      firstName: {
        type: "string",
        alpha: true,
      },
      lastName: {
        type: "string",
        alpha: true,
      },
      fullName: {
        type: "string",
      },
      citizen: {
        type: "enum",
        values: ["WNI", "WNA"],
      },
      nik: {
        type: "string",
        length: 16,
        numeric: true,
      },
      address: {
        type: "string",
      },
      date: {
        type: "string",
      },
      phone: {
        type: "string",
        numeric: true,
      },
      email: {
        type: "email",
        unique: true,
      },
      password: {
        type: "string",
        min: 8,
        singleLine: true,
      },
      role: {
        type: "enum",
        values: ["user", "admin"],
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

    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User has been Signed up successfully!",
      data: user,
    });

    next();
  },
};

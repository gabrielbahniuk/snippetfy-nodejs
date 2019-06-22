const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { validateData } = require('../util');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },
  signup(req, res) {
    return res.render('auth/signup');
  },

  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!validateData([name, email, password])) {
        req.flash('error', 'Please fill the fields correctly!');
        return res.redirect('back');
      }

      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'Email already registered!');
        return res.redirect('back');
      }

      const encryptedPassword = await bcrypt.hash(password, 5);
      await User.create({ ...req.body, encryptedPassword });
      req.flash('success', 'User successfully created!');
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        req.flash('error', 'User doest not exist!');
        return res.redirect('back');
      }
      if (!(await bcrypt.compare(password, user.password))) {
        req.flash('error', 'Incorrect password!');
        return res.redirect('back');
      }
      req.session.user = user;

      return req.session.save(() => res.redirect('app/dashboard'));
    } catch (err) {
      return next(err);
    }
  },
  signout(req, res) {
    return req.session.destroy(() => res.redirect('/'));
  }
};
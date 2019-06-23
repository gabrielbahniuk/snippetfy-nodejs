const bcrypt = require('bcryptjs');
const crypto = require('crypto-random-string');
const { User, VerificationToken } = require('../models');
const { validateData } = require('../util');
const { sendVerificationEmail } = require('./emailController');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },
  signup(req, res) {
    return res.render('auth/signup');
  },

  async register(req, res, next) {
    try {
      const { name, email } = req.body;

      if (await !validateData([name, email])) {
        req.flash('error', 'Please fill the fields correctly!');
        return res.redirect('back');
      }

      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'Email already registered!');
        return res.redirect('back');
      }
      const password = await bcrypt.hash(req.body.password, 5);

      const createdUser = await User.create({ ...req.body, password });

      const validateToken = await VerificationToken.create({
        UserId: createdUser.id,
        token: crypto({ length: 16 })
      });

      if (validateToken) {
        await sendVerificationEmail(email, validateToken.token);
        req.flash('success', `Please check the e-mail address ${email}`);
        return res.redirect('/');
      } else {
        req.flash('error', 'Invalid token!');
        return res.redirect('back');
      }
    } catch (err) {
      return next(err);
    }
  },
  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        req.flash('error', 'User does not exist!');
        return res.redirect('back');
      }
      if (!(await bcrypt.compare(password, user.password))) {
        req.flash('error', 'Incorrect password!');
        return res.redirect('back');
      }
      if (await !user.isVerified) {
        req.flash('error', 'User still not activated. Verify your e-mail!');
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

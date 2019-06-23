const { User, VerificationToken } = require('../models');

module.exports = {
  async check(req, res, next) {
    try {
      const user = await User.findOne({
        where: { email: req.query.email }
      });
      if (user.isVerified) {
        req.flash('error', 'Email Already Verified');
        return res.redirect('back');
      } else {
        const token = await VerificationToken.findOne({
          where: { token: req.query.token }
        });
        if (token) {
          const updatedUser = await user.update({ isVerified: true });
          req.flash(
            'success',
            `User with ${updatedUser.email} has been verified`
          );
          return res.redirect('/');
        } else {
          req.flash('error', 'Token expired');
          return res.redirect('back');
        }
      }
    } catch (err) {
      return next(err);
    }
  }
};

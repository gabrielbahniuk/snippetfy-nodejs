const Sequelize = require('sequelize');

const Op = Sequelize;
const { Snippet, Category } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { categoryId } = req.params;
      const snippet = await Snippet.create({ ...req.body, CategoryId: categoryId });
      req.flash('success', 'Snippet created successfully');
      return res.redirect(`/app/categories/${categoryId}/snippets/${snippet.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async show(req, res, next) {
    try {
      const { categoryId, id } = req.params;

      const categories = await Category.findAll({
        include: [Snippet],

        where: { UserId: req.session.user.id },
      });

      const snippets = await Snippet.findAll({
        where: { CategoryId: categoryId },
      });

      const snippet = await Snippet.findByPk(id);

      return res.render('snippets/show', {
        activeCategory: categoryId,
        categories,
        snippets,
        currentSnippet: snippet,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const snippet = await Snippet.findByPk(req.params.id);
      await snippet.update(req.body);
      req.flash('success', 'Snippet updated successfully!');
      return res.redirect(`/app/categories/${req.params.categoryId}/snippets/${snippet.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      await Snippet.destroy({ where: { id: req.params.id } });
      req.flash('success', 'Snippet removed successfully!');
      return res.redirect(`/app/categories/${req.params.categoryId}`);
    } catch (err) {
      return next(err);
    }
  },
};

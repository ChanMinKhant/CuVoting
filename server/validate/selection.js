const joi = require('joi');

//   const { title, selectionId } = req.body;
exports.selectionSchema = joi.object({
  title: joi.string().required(),
  selectionId: joi.string().required(),
});

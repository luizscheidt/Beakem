const Joi = require("joi");

module.exports.albumSchema = Joi.object({
  album: Joi.object({
    name: Joi.string().required(),
    rating: Joi.number().required().min(0).max(10),
    artist: Joi.string().required(),
  }).required(),
});

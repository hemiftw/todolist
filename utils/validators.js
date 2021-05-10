import Joi from "joi";

export const validateTask = Joi.object().keys({
  title: Joi.string().required().min(6).max(100),
  description: Joi.string().required().min(15),
  priority: Joi.string().required(),
  gifts: Joi.string().required(),
  status: Joi.string().required(),
  id: Joi.number().required(),
});

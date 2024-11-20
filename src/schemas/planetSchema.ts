import * as Joi from "joi";

//esquema para validacion de datos del cuerpo de la solicitud al registrar un planeta
export const planetSchema = Joi.object({
  nombre: Joi.string().required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre no puede estar vacío.',
    'any.required': 'El nombre es un campo obligatorio.',
  }),
  periodoRotacion: Joi.number().required().messages({
    'number.base': 'El periodo de rotación debe ser un número.',
    'number.empty': 'El periodo de rotación no puede estar vacío.',
    'any.required': 'El periodo de rotación es un campo obligatorio.',
  }),
  periodoOrbital: Joi.number().required().messages({
    'number.base': 'El periodo orbital debe ser un número.',
    'number.empty': 'El periodo orbital no puede estar vacío.',
    'any.required': 'El periodo orbital es un campo obligatorio.',
  }),
  diametro: Joi.number().required().messages({
    'number.base': 'El diámetro debe ser un número.',
    'number.empty': 'El diámetro no puede estar vacío.',
    'any.required': 'El diámetro es un campo obligatorio.',
  }),
  clima: Joi.string().required().messages({
    'string.base': 'El clima debe ser un texto.',
    'string.empty': 'El clima no puede estar vacío.',
    'any.required': 'El clima es un campo obligatorio.',
  }),
  gravedad: Joi.string().required().messages({
    'string.base': 'La gravedad debe ser un texto.',
    'string.empty': 'La gravedad no puede estar vacía.',
    'any.required': 'La gravedad es un campo obligatorio.',
  }),
  terreno: Joi.string().required().messages({
    'string.base': 'El terreno debe ser un texto.',
    'string.empty': 'El terreno no puede estar vacío.',
    'any.required': 'El terreno es un campo obligatorio.',
  }),
  superficieAgua: Joi.number().optional().messages({
    'number.base': 'La superficie de agua debe ser un número.',
  }),
  poblacion: Joi.number().optional().messages({
    'number.base': 'La población debe ser un número.',
  }),
});
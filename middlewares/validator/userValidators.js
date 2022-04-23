const { check, validationResult } = require('express-validator');
const isBase64 = require('is-base64');
const { Profile } = require('../../models/profile');
const { User } = require('../../models/user');

let validators = {}
validators.addUserValidators = [
    check('name')
        .isLength({ min: 3 })
        .withMessage('Name is required')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error('Email already is use!');
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol')
        .custom((value, { req }) => {
            if (value.toString() !== req.body.passwordConfirmation.toString()) {
                throw new Error('Password confirmation is incorrect');
            } else {
                return true;
            }
        }),
    check('profile').optional(),
    check('profile.phone')
        .if(check('profile').exists())
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage('Mobile number must be a valid Bangladeshi mobile number. Ex: +8801811111111')
        .custom(async (value) => {
                try {
                    const profile = await Profile.findOne({ phone: value });
                    if (profile) {
                        throw new Error('Mobile number already is use!');
                    }
                } catch (err) {
                    throw new Error(err.message);
                }
        }),
    check('profile.address1')
        .if(check('profile').exists())
        .isLength({ min: 1 })
        .withMessage('Address line 1 is required!'),
    check('profile.address2')
        .if(check('profile').exists())
        .isLength({ min: 1 })
        .withMessage('Address line 2 is required!'),
    check('profile.city')
        .if(check('profile').exists())
        .isLength({ min: 1 })
        .withMessage('City is required!'),
    check('profile.state')
        .if(check('profile').exists())
        .isLength({ min: 1 })
        .withMessage('State is required!'),
    check('profile.postalCode')
        .if(check('profile').exists())
        .isLength({ min: 1 })
        .withMessage('Postal code is required!')
        .isInt()
        .withMessage('integers only!'),
    check('profile.country')
        .if(check('profile').exists())
        .isLength({ min: 1 })
        .withMessage('Country is required!'),
    check('profile.photo')
        .if(check('profile').exists())
        .custom((value) => {
            const base64 = isBase64(value, {mimeRequired: true });
            if (base64) {
                return true;
            } else {
                throw new Error('Invalid base64 string');
            }
        }),
];

validators.updateUserValidators = [
    check('name')
        .optional()
        .isLength({min:3})
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('email')
        .optional()
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error('Email already is use!');
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }),
    check('password')
        .optional()
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol')
        .custom((value, { req }) => {
            if (value.toString() !== req.body.passwordConfirmation.toString()) {
                throw new Error('Password confirmation is incorrect');
            } else {
                return true;
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status!'),
    check('role')
        .optional()
        .isIn(['admin', 'user'])
        .withMessage('Invalid status!'),
];

validators.updateProfileValidators = [
    check('phone')
        .optional()
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage('Mobile number must be a valid Bangladeshi mobile number. Ex: +8801811111111')
        .custom(async (value) => {
            try {
                const profile = await Profile.findOne({ phone: value });
                if (profile) {
                    throw new Error('Mobile number already is use!');
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }),
    check('postalCode')
        .optional()
        .isLength({ min: 4 })
        .withMessage('Postal code is required!')
        .isInt()
        .withMessage('integers only!'),
    check('photo')
        .optional()
        .custom((value) => {
            const base64 = isBase64(value, {mimeRequired: true });
            if (base64) {
                return true;
            } else {
                throw new Error('Invalid base64 string');
            }
        }),
];

module.exports = validators;

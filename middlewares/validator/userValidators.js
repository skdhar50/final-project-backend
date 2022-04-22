const { check, validationResult } = require('express-validator');
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
        .isLength({ min: 1 })
        .withMessage('Profile photo is required!'),
];

validators.updateUserValidators = [
    check('name')
        .if(check('name').exists())
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('email')
        .if(check('email').exists())
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
        .if(check('password').exists())
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
        .if(check('status').exists())
        .isIn(['active', 'inactive']),
    check('role')
        .if(check('role').exists())
        .isIn(['admin', 'user']),
];

validators.updateProfileValidators = [
    check('phone')
        .if(check('phone').exists())
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
        .if(check('postalCode').exists())
        .isLength({ min: 4 })
        .withMessage('Postal code is required!')
        .isInt()
        .withMessage('integers only!'),
];

validators.userValidationHandler = (req, res, next)=>{
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(500).json({
            errors: mappedErrors,
        })
    }
}

module.exports = validators;

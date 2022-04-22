const { check, validationResult } = require('express-validator');
const { Category } = require('../../models/category');

let validators = {}

// Banner validator
validators.addBannerValidator = [
    check('photo')
        .isLength({ min: 1 })
        .withMessage('Photo is required'),
    check('link_to')
        .isLength({ min: 1 })
        .withMessage('Link is required'),
    check('size')
        .isLength({ min: 1 })
        .withMessage('Size is required')
        .isIn(['small', 'large'])
        .withMessage('Invalid size value'),
    check('status')
        .if(check('status').exists())
        .isLength({ min: 1 })
        .withMessage('Size is required')
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status value'),
];
validators.updateBannerValidator = [
    check('link_to')
        .if(check('link_to').exists())
        .isLength({ min: 1 })
        .withMessage('Link is required'),
    check('size')
        .if(check('size').exists())
        .isLength({ min: 1 })
        .withMessage('Size is required')
        .isIn(['small', 'large'])
        .withMessage('Invalid size value'),
    check('status')
        .if(check('status').exists())
        .isLength({ min: 1 })
        .withMessage('Size is required')
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status value'),
];

// Brand validator
validators.addBrandValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('icon')
        .isLength({ min: 1 })
        .withMessage('Icon is required'),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
validators.updateBrandValidator = [
    check('name')
        .if(check('name').exists())
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];

// Carousel validator
validators.addCarouselValidator = [
    check('title')
        .isLength({ min: 1 })
        .withMessage('Title is required'),
    check('description')
        .isLength({ min: 1 })
        .withMessage('Description is required'),
    check('photo')
        .isLength({ min: 1 })
        .withMessage('Photo is required'),
    check('link_to')
        .isLength({ min: 1 })
        .withMessage('Link is required'),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
validators.updateCarouselValidator = [
    check('title')
        .if(check('title').exists())
        .isLength({ min: 1 })
        .withMessage('Title is required'),
    check('description')
        .if(check('description').exists())
        .isLength({ min: 1 })
        .withMessage('Description is required'),
    check('photo')
        .if(check('photo').exists())
        .isLength({ min: 1 })
        .withMessage('Photo is required'),
    check('link_to')
        .if(check('link_to').exists())
        .isLength({ min: 1 })
        .withMessage('Link is required'),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];

// Category validator
validators.addCategoryValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('parent_id')
        .if(check('parent_id').exists())
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error('There was a server side error!');
            }
        }),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
validators.updateCategoryValidator = [
    check('name')
        .if(check('name').exists())
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('parent_id')
        .if(check('parent_id').exists())
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error('There was a server side error!');
            }
        }),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];

// Coupon validator
validators.addBrandValidator = [
    check('code')
        .isLength({ min: 1 })
        .withMessage('Code is required'),
    check('start_form')
        .isDate()
        .withMessage('Must be a valid date'),
    check('expired_in')
        .isDate()
        .withMessage('Must be a valid date'),
    check('discounted_amount')
        .isLength({ min: 1 })
        .withMessage('discounted_amount amount is required')
        .isInt()
        .withMessage('discounted_amount must be an integer value'),
    check('offer_limit')
        .if(check('offer_limit').exists())
        .isInt()
        .withMessage('offer_limit must be an integer value'),
    check('min_shopping_amount') 
        .isInt()
        .withMessage('min_shopping_amount must be an integer value'),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];

validators.validationHandler = (req, res, next)=>{
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

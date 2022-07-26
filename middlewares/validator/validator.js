const { check, validationResult } = require('express-validator');
const isBase64 = require('is-base64');
const { Category } = require('../../models/category');
const { Brand } = require('../../models/brand');
const { Product } = require('../../models/product');
const { User } = require('../../models/user');
const { Dealer } = require('../../models/dealer');
const { Coupon } = require('../../models/coupon');
const { optional } = require('joi');


let validators = {}

// Banner validator
validators.addBannerValidator = [
    check('photo')
        .isLength({ min: 1 })
        .withMessage('Photo (base64 string) is required')
        .custom((value) => {
            const base64 = isBase64(value, {mimeRequired: true });
            if (base64) {
                return true;
            } else {
                throw new Error('Invalid base64 string');
            }
        }),
    check('link_to')
        .isURL()
        .withMessage('Invalid URL'),
    check('size')
        .isLength({ min: 1 })
        .withMessage('Size is required')
        .isIn(['small', 'large'])
        .withMessage('Invalid size value'),
    check('status')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Size is required')
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status value'),
];
validators.updateBannerValidator = [
    check('link_to')
        .optional()
        .isURL()
        .withMessage('Invalid URL'),
    check('size')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Size is required')
        .isIn(['small', 'large'])
        .withMessage('Invalid size value'),
    check('status')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Size is required')
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status value'),
];
// End Banner validator

// Brand validator
validators.addBrandValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required')
        .custom(async (value) => {
            try {
                const data = await Brand.findOne({"name": value});
                if (data) {
                    throw new Error('Brand name must be unique');
                }
            } catch (err) {
                throw new Error('Brand name must be unique!');
            }
        }),
    check('icon')
        .isLength({ min: 1 })
        .withMessage('Icon (base64 string) is required')
        .custom((value) => {
            const base64 = isBase64(value, {mimeRequired: true });
            if (base64) {
                return true;
            } else {
                throw new Error('Invalid base64 string');
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
validators.updateBrandValidator = [
    check('name')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Name is required')
        .custom(async (value, { req }) => {
            try {
                const brand = await Brand.findOne({ "name": value, "_id":{$ne: req.body.id}});
                if (brand) {
                    throw new Error('Brand name must be unique!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('icon')
        .optional()
        .custom(async (value) => {
            const base64 = isBase64(value, {mimeRequired: true });
            if (base64) {
                return true;
            } else {
                throw new Error('Invalid base64 string');
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
// End Brand validator

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
        .withMessage('photo (base64 string) is required')
        .custom((value) => {
            const base64 = isBase64(value, {mimeRequired: true });
            if (base64) {
                return true;
            } else {
                throw new Error('Invalid base64 string');
            }
        }),
    check('link_to')
        .isLength({ min: 1 })
        .withMessage('Link is required')
        .isURL({ min: 1 })
        .withMessage('Invalid link'),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status')
];
validators.updateCarouselValidator = [
    check('title')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Title is required'),
    check('description')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Description is required'),
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
    check('link_to')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Link is required')
        .isURL()
        .withMessage('Invalid link'),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
// End Carousel validator

// Category validator
validators.addCategoryValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required')
        .custom(async (value) => {
            try {
                const category = await Category.findOne({ name: value });
                if (category) {
                    throw new Error('category name must be unique!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('parent_id')
        .if(check('parent_id').exists())
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size'),
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
validators.updateCategoryValidator = [
    check('name')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Name is required'),
        // .custom(async (value) => {
        //     try {
        //         const category = await Category.findOne({ name: value });
        //         if (category) {
        //             throw new Error('category name must be unique!');
        //         }
        //     } catch (err) {
        //         throw new Error('category name must be unique!');
        //     }
        // }),
    check('parent_id')
        .optional()
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
// End Category validator

// Coupon validator
validators.addCouponValidator = [
    check('code')
        .isLength({ min: 1 })
        .withMessage('Code is required')
        .custom(async (value) => {
            try {
                const code = await Coupon.findOne({ code: value });
                if (code) {
                    throw new Error('Coupon must be unique!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
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
    check('categories.*') 
        .if(check('categories').exists())
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('brands.*') 
        .if(check('brands').exists())
        .custom(async (value) => {
            try {
                const data = await Brand.findById(value);
                if (!data) {
                    throw new Error('Invalid brand ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('products.*') 
        .if(check('products').exists())
        .custom(async (value) => {
            try {
                const data = await Product.findById(value);
                if (!data) {
                    throw new Error('Invalid brand ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('users.*') 
        .if(check('users').exists())
        .custom(async (value) => {
            try {
                const data = await User.findById(value);
                if (!data) {
                    throw new Error('Invalid user ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
validators.updateCouponValidator = [
    check('code')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Code is required')
        .custom(async (value, { req }) => {
            try {
                const code = await Coupon.findOne({ code: value, _id: { $ne: req.body._id } });
                if (code) {
                    throw new Error('Coupon must be unique!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('start_form')
        .optional()
        .isDate()
        .withMessage('Must be a valid date'),
    check('expired_in')
        .optional()
        .isDate()
        .withMessage('Must be a valid date'),
    check('discounted_amount')
        .optional()
        .isLength({ min: 1 })
        .withMessage('discounted_amount amount is required')
        .isInt()
        .withMessage('discounted_amount must be an integer value'),
    check('offer_limit')
        .optional()
        .isInt()
        .withMessage('offer_limit must be an integer value'),
    check('min_shopping_amount') 
        .optional()
        .isInt()
        .withMessage('min_shopping_amount must be an integer value'),
    check('categories.*') 
        .if(check('categories').exists())
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('brands.*') 
        .if(check('brands').exists())
        .custom(async (value) => {
            try {
                const data = await Brand.findById(value);
                if (!data) {
                    throw new Error('Invalid brand ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('products.*') 
        .if(check('products').exists())
        .custom(async (value) => {
            try {
                const data = await Product.findById(value);
                if (!data) {
                    throw new Error('Invalid product ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('users.*') 
        .if(check('users').exists())
        .custom(async (value) => {
            try {
                const data = await User.findById(value);
                if (!data) {
                    throw new Error('Invalid user ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];

// Deal validator
validators.addDealValidator = [
    check('dealer')
        .isLength({ min: 1 })
        .withMessage('Dealer is required')
        .custom(async (value) => {
            try {
                const dealer = await Dealer.findById(value);
                if (!dealer) {
                    throw new Error('Invalid dealer ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('deal_value')
        .isLength({ min: 1 })
        .withMessage('deal value is required')
        .isInt()
        .withMessage('deal value must be an integer'),
    check('products')
        .isLength({ min: 1 })
        .withMessage('products is required'),
    check('products.*.name')
        .isLength({ min: 1 })
        .withMessage('products name is required'),
    check('products.*.brand')
        .isLength({ min: 1 })
        .withMessage('brand is required')
        .custom(async (value) => {
            try {
                const data = await Brand.findById(value);
                if (!data) {
                    throw new Error('Invalid brand ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('products.*.category.*')
        .isLength({ min: 1 })
        .withMessage('category is required')
        .custom(async (value) => {
            try {
                const data = await Category.findById(value);
                if (!data) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('products.*.quantity')
        .isLength({ min: 1 })
        .withMessage('quantity is required')
        .isInt()
        .withMessage('quantity must be an integer'),
    check('products.*.unit_cost')
        .isLength({ min: 1 })
        .withMessage('unit cost is required')
        .isInt()
        .withMessage('unit cost must be an integer'),
    check('date')
        .isDate()
        .withMessage('invalid date'),
    check('payment_status')
        // .isLength({ min: 1 })
        // .withMessage('payment status is required')
        .optional()
        .isIn(['paid', 'unpaid', 'risidual'])
        .withMessage('Invalid size value'),
    check('due')
        .isLength({ min: 1 })
        .withMessage('due is required')
        .isInt()
        .withMessage('due must be an integer'),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
validators.UpdateDealValidator = [
    check('dealer')
        .optional()
        .custom(async (value) => {
            try {
                const dealer = await Dealer.findById(value);
                if (!dealer) {
                    throw new Error('Invalid dealer ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('deal_value')
        .optional()
        .isInt()
        .withMessage('deal value must be an integer'),
    check('products.*.name')
        .if(check('products.*.name').exists())
        .isLength({ min: 1 })
        .withMessage('products name is required'),
    check('products.*.brand')
        .if(check('products.*.brand').exists())
        .custom(async (value) => {
            try {
                const data = await Brand.findById(value);
                if (!data) {
                    throw new Error('Invalid dealer ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('products.*.category.*')
        .if(check('products.*.category').exists())
        .custom(async (value) => {
            try {
                const data = await Category.findById(value);
                if (!data) {
                    throw new Error('Invalid dealer ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('products.*.quantity')
        .if(check('products.*.quantity').exists())
        .isInt()
        .withMessage('quantity must be an integer'),
    check('products.*.unit_cost')
        .if(check('products.*.unit_cost').exists())
        .isInt()
        .withMessage('unit cost must be an integer'),
    check('date')
        .optional()
        .isDate()
        .withMessage('invalid date'),
    check('payment_status')
        .optional()
        .isIn(['paid', 'unpaid', 'risidual'])
        .withMessage('Invalid size value'),
    check('due')
        .optional()
        .isInt()
        .withMessage('due must be an integer'),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
// End Deal validator

// Dealer validator
validators.addDealerValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
        // .custom(async (value) => {
        //     try {
        //         const code = await Dealer.findOne({ name: value });
        //         if (code) {
        //             throw new Error('Name must be unique!');
        //         }
        //     } catch (err) {
        //         throw new Error(err);
        //     }
        // }),
    check('company')
        .isLength({ min: 1 })
        .withMessage('company is required'),
    check('phone')
        .isLength({ min: 1 })
        .withMessage('phone is required'),
    check('email')
        .isEmail()
        .withMessage('Invalid email address'),
    check('address')
        .isLength({ min: 1 })
        .withMessage('address is required'),
    check('products')
        .isLength({ min: 1 })
        .withMessage('products is required'),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
validators.updateDealerValidator = [
    check('name')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Name is required'),
        // .custom(async (value) => {
        //     try {
        //         const code = await Dealer.findOne({ name: value });
        //         if (code) {
        //             throw new Error('Name must be unique!');
        //         }
        //     } catch (err) {
        //         throw new Error('Name must be unique!');
        //     }
        // }),
    check('company')
        .optional()
        .isLength({ min: 1 })
        .withMessage('company is required'),
    check('phone')
        .optional()
        .isLength({ min: 1 })
        .withMessage('phone is required'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address'),
    check('address')
        .optional()
        .isLength({ min: 1 })
        .withMessage('address is required'),
    check('products')
        .optional()
        .isLength({ min: 1 })
        .withMessage('products is required'),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
// End Dealer validator

// Employee validator
validators.addEmployeeValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Invalid email address'),
    check('phone')
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage('Mobile number must be a valid Bangladeshi mobile number. Ex: +8801811111111'),
    check('nid')
        .isLength({ min: 10, max: 17 })
        .withMessage('Invalid nid number')
        .isInt()
        .withMessage('nid must be an integer'),
    check('address')
        .isLength({ min: 1 })
        .withMessage('address is required'),
    check('joining_date')
        .isDate()
        .withMessage('Invalid date'),
    check('type')
        .isIn(["support", "manager", "guard", "delivery_man", "general"])
        .withMessage('Invalid type'),
    check('shift')
        .isIn(["day", "night"])
        .withMessage('Invalid shift'),
    check('salary')
        .isInt()
        .withMessage('salary must be an integer'),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status value')
];
validators.updateEmployeeValidator = [
    check('name')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address'),
    check('phone')
        .optional()
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage('Mobile number must be a valid Bangladeshi mobile number. Ex: +8801811111111'),
    check('nid')
        .optional()
        .isLength({ min: 10, max: 17 })
        .withMessage('Invalid nid number')
        .isInt()
        .withMessage('nid must be an integer'),
    check('address')
        .optional()
        .isLength({ min: 1 })
        .withMessage('address is required'),
    check('joining_date')
        .optional()
        .isDate()
        .withMessage('Invalid date'),
    check('type')
        .optional()
        .isIn(["support", "manager", "guard", "delivery_man", "general"])
        .withMessage('Invalid type'),
    check('shift')
        .optional()
        .isIn(["day", "night"])
        .withMessage('Invalid shift'),
    check('salary')
        .optional()
        .isInt()
        .withMessage('salary must be an integer'),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status value')
];
// End Employee validator

// Notification validator
validators.addNotificationValidator = [
    check('title')
        .isLength({ min: 1 })
        .withMessage('title is required'),
    check('description')
        .isLength({ min: 1 })
        .withMessage('description is required'),
    check('type')
        .isIn(["individual", "public"])
        .withMessage('Invalid type'),
    check('notify_for.*')
        .optional()
        .custom(async (value) => {
            try {
                const user = await User.findById(value);
                if (!user) {
                    throw new Error('Invalid user ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status')
];
validators.updateNotificationValidator = [
    check('title')
        .optional()
        .isLength({ min: 1 })
        .withMessage('title is required'),
    check('description')
        .optional()
        .isLength({ min: 1 })
        .withMessage('description is required'),
    check('type')
        .optional()
        .isIn(["individual", "public"])
        .withMessage('Invalid type'),
    check('notify_for.*')
        .optional()
        .custom(async (value) => {
            try {
                const user = await User.findById(value);
                if (!user) {
                    throw new Error('Invalid user ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status')
];
// End Notification validator

// Offer validator
validators.addOfferValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('startDate')
        .isDate()
        .withMessage('invalid date'),
    check('photo')
        .isLength({ min: 1 })
        .withMessage('photo (base64 string) is required')
        .custom((value) => {
            const base64 = isBase64(value, {mimeRequired: true });
            if (base64) {
                return true;
            } else {
                throw new Error('Invalid base64 string');
            }
        }),
    check('endDate')
        .isDate()
        .withMessage('invalid date'),
    check('description')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('discountAmount')
        .isInt()
        .withMessage('discount amount must be an integer'),
    check('category.*')
        .if(check('category').exists())
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('brand.*')
        .if(check('brand').exists())
        .custom(async (value) => {
            try {
                const brand = await Brand.findById(value);
                if (!brand) {
                    throw new Error('Invalid brand ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('products.*')
        .if(check('products').exists())
        .custom(async (value) => {
            try {
                const product = await Product.findById(value);
                if (!product) {
                    throw new Error('Invalid product ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
validators.updateOfferValidator = [
    check('name')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('startDate')
        .optional()
        .isDate()
        .withMessage('invalid date'),
    check('endDate')
        .optional()
        .isDate()
        .withMessage('invalid date'),
    check('description')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('discountAmount')
        .optional()
        .isInt()
        .withMessage('discount amount must be an integer'),
    check('category.*')
        .if(check('category').exists())
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('brand.*')
        .if(check('brand').exists())
        .custom(async (value) => {
            try {
                const brand = await Brand.findById(value);
                if (!brand) {
                    throw new Error('Invalid brand ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('products.*')
        .if(check('products').exists())
        .custom(async (value) => {
            try {
                const product = await Product.findById(value);
                if (!product) {
                    throw new Error('Invalid product ID!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid size value')
];
// End Offer validator

// Review validator
validators.updateReviewValidator = [
    check('review')
        .optional()
        .isLength({ min: 1 })
        .withMessage('review is required'),
    check('rating')
        .optional()
        .isLength({ min: 1 })
        .withMessage('rating is required')
];

validators.validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(422).json({
            errors: mappedErrors,
        })
    }
}

module.exports = validators;

const router = require("express").Router();
const { userList, userProfile, createUser, updateUser, updateProfile, removeUser } = require("../../controllers/adminControllers/userController");
const { addUserValidators, updateUserValidators, updateProfileValidators} = require("../../middlewares/validator/userValidators");
const { validationHandler } = require("../../middlewares/validator/validator");

router.get('/', userList); // user list
router.post('/', addUserValidators, validationHandler, createUser); // add new user
router.get('/:id', userProfile); // user profile
router.put('/:id', updateUserValidators, validationHandler, updateUser); // @toDo encrypt password
router.put('/profile/:id', updateProfileValidators, validationHandler, updateProfile); // update user profile
router.delete('/:id', removeUser)

module.exports = router;

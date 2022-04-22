const router = require("express").Router();
const { userList, userProfile, createUser, updateUser, updateProfile, removeUser } = require("../../controllers/adminControllers/userController");
const { addUserValidators, updateUserValidators, updateProfileValidators, userValidationHandler } = require("../../middlewares/validator/userValidators");

router.get('/', userList); // user list
router.post('/', addUserValidators, userValidationHandler, createUser); // add new user
router.get('/:id', userProfile); // user profile
router.put('/:id', updateUserValidators, userValidationHandler, updateUser); // @toDo encrypt password
router.put('/profile/:id', updateProfileValidators, userValidationHandler, updateProfile); // update user profile
router.delete('/:id', removeUser)

module.exports = router;

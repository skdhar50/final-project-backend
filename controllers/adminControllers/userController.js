// const fs = require('fs');
const { User } = require("../../models/user");
const { Profile } = require("../../models/profile");
const bcrypt = require("bcrypt");
const { base64Decode } = require("../../utilities/base64");
const mongoose = require("mongoose");

let user = {};

user.createUser = async (req, res) => {
	const password = await bcrypt.hash(req.body.password, 10);
	// res.send(password);

	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: password,
		role: req.body.role,
	});

	try {
		const user = await newUser.save();

		let profile = {};

		if (req.body.hasOwnProperty("profile")) {
			const newProfile = new Profile({
				...req.body.profile,
				photo: base64Decode(req.body.profile.photo, "USER"),
				user: user._id,
			});
			profile = await newProfile.save();
		}

		res.json({
			data: {
				user,
				profile,
			},
			message: "User was added successfully!",
			error: false,
		});
	} catch {
		res.status(500).json({
			message: "There was a server side error!",
			error: true,
		});
	}
};

user.userList = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $match: { role: "user" }
            },
            {
                
                $lookup: {
                from: "profiles",
                localField: "_id",
                foreignField: "user",
                as: "profile",
                },
            },
            {$unwind: "$profile" },
        ]).sort({ _id: -1 });
        res.json({
            data: {
                users,
            },
            message: "Suceesfully retrived!",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
user.adminList = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select({ "password": 0, "__v":0 }).sort({ _id: -1 });
        res.json({
            data: {
                admins,
            },
            message: "Suceesfully retrived!",
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}

user.userProfile = async (req, res) => {
	try {
		const user = await User.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
			{
				$lookup: {
					from: "profiles",
					localField: "_id",
					foreignField: "user",
					as: "profile",
				},
			},
			{
				$lookup: {
					from: "orders",
					localField: "_id",
					foreignField: "user",
					as: "orders",
				},
			},
			{
				$lookup: {
					from: "cartitems",
					localField: "_id",
					foreignField: "user",
					as: "cartItmes",
				},
			},
			{
				$lookup: {
					from: "reviews",
					localField: "_id",
					foreignField: "user",
					as: "reviews",
				},
			},
			{
				$lookup: {
					from: "qnas",
					localField: "_id",
					foreignField: "user",
					as: "qnas",
				},
			},
			{
				$lookup: {
					from: "wishlists",
					localField: "_id",
					foreignField: "user",
					as: "wishlists",
				},
			},
			{ $unwind: "$profile" },
		]);

		res.json({
			data: {
				user: user[0],
			},
			message: "Suceesfully retrived!",
			error: false,
		});
	} catch (err) {
		res.status(500).json({
			message: "There was a server side error!",
			error: true,
		});
	}
};

user.updateUser = async (req, res) => {
	try {
		
		if (req.body.hasOwnProperty('password')) {
			req.body.password = await bcrypt.hash(req.body.password, 10);
		}
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: { ...req.body } },
			{ new: true }
		);
		res.json({
			data: {
				user: user,
			},
			message: "User was updated suceesfully!",
			error: false,
		});
	} catch (err) {
		res.status(500).json({
			message: "There was a server side error!",
			error: true,
		});
	}
};
user.updateProfile = async (req, res) => {
	delete req.body.user;
	try {
		const findProfile = await Profile.findOneAndUpdate({ user: req.params.id });
		if (findProfile) {
			if (req.body.hasOwnProperty("photo")) {
				req.body.photo = base64Decode(req.body.photo, "USER");
			}
			const profile = await Profile.findByIdAndUpdate(
				findProfile._id,
				{ $set: { ...req.body } },
				{ new: true }
			);
			res.json({
				data: {
					profile: profile,
				},
				message: "Profile was updated suceesfully!",
				error: false,
			});
		} else {
			const newProfile = new Profile({
				...req.body,
				user: req.params.id,
				photo: base64Decode(req.body.photo),
			});
			res.json({
				data: {
					profile: await newProfile.save(),
				},
				message: "Profile was created suceesfully!",
				error: false,
			});
		}
	} catch (err) {
		res.status(500).json({
			message: "There was a server side error!",
			error: true,
		});
	}
};

user.removeUser = async (req, res) => {
	try {
		let deletedUser = {};
		const user = await User.findById(req.params.id);
		if (user) {
			deletedUser.profile = await Profile.findOneAndDelete({ user: user._id });
			deletedUser.user = await User.findByIdAndDelete(req.params.id);

			res.json({
				data: {
					...deletedUser,
				},
				message: "User was deleted suceesfully!",
				error: false,
			});
		} else {
			res.json({
				message: "Invalid user id",
				error: true,
			});
		}
	} catch (err) {
		res.status(500).json({
			message: "There was a server side error!",
			error: true,
		});
	}
};

module.exports = user;

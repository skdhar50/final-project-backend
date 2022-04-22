const users = await User.aggregate([
    {
        $lookup: {
            from: "profiles",
            as: "profile",
            let: { user: "$_id" },
            pipeline: [
                { $match: { $expr: { $eq: [`$user`, `$$user`] } } },
                // {
                //     $project: {
                //         _id: 1,
                //         phone: 1
                //     }
                // }
            ]
        }
    }
    
])
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.header("Authorization");
    
	if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
    
	
    try {
        token = token.split(" ")[1].trim();
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role !== "admin") {
            return res.status(401).send("Invalid Token");
        }
        res.send(decoded)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
	
	req.user = decoded;
	next();
};

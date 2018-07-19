import user from '../models/user';

function deserializeUser(req, res, next) {
	if (req.session.userId) {
		return User.findById(req.session.userId)
		.then(function(user) {
			if (user) {
				req.user = user;
			}
			else {
				req.session.userId = null;
			}
			next()
		})
		.catch(function(error) {
			console.error("deserializeUser failed");
			console.error(error);
			next();
		})
	}
	else {
		next();
	}
}
export default deserializeUser;

module.exports = () => (req, res, next) => {
  const role = req.user.roles;
  if(role === 'admin') {
    next();
  } else {
    throw new Error({
      statusCode: 401,
      error: 'requires Admin access'
    })
      .catch(next);
  }
};
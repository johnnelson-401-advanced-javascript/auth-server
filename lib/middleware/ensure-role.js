
module.exports = () => (req, res, next) => {
  const roles = req.user.roles[0];
  
  if(roles === 'admin') {
    next();
  } else {
    throw new Error({
      statusCode: 401,
      error: 'requires Admin access'
    })
      .catch(next);
  }
};
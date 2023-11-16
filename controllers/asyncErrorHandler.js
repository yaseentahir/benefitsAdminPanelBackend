module.exports = (handler) => {
  return () => {
    handler(req, res, next).catch((err) => next(err));
  };
};

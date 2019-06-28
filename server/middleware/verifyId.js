function verifyId(req, res, next) {
  try {
    const user = Users.findById(req.params.id);
    if (user) next();
    else res.status(404).json({ message: 'id not found' });
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = verifyId;

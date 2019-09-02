const Content = require('../../models/Content');

const getContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id);
    res.json({ Content: content });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.json({ Error: 'Content not found' });
    }
    res.status(500).send({ Error: 'Something failed!' });
  }
};

module.exports = { getContent };

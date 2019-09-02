const Channel = require('../../models/Channel');

const getChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findOne({ _id: id });
    res.json({ Channel: channel });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.json({ Error: 'Channel not found' });
    }
    res.status(500).send({ Error: 'Something failed!' });
  }
};

module.exports = { getChannel };

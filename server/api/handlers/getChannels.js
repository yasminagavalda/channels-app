const Channel = require('../../models/Channel');

const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.json({ Channels: channels });
  } catch (err) {
    res.status(500).send({ Error: 'Something failed!' });
  }
};

module.exports = { getChannels };

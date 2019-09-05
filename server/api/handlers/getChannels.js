const Channel = require('../../models/Channel');

const getQueryFilter = req => {
  const filter = {};
  if (req.query.group) {
    const { group } = req.query;
    const groupsFilter = [];
    if (group instanceof Array) {
      group.forEach(item => groupsFilter.push(item));
    } else {
      groupsFilter.push(group);
    }
    filter.groups = { $in: groupsFilter };
  }
  return filter;
};

const getChannels = async (req, res) => {
  try {
    const filter = getQueryFilter(req);
    const channels = await Channel.find(filter);
    res.json({ Channels: channels });
  } catch (err) {
    console.error(`Error searching channels: ${err}`);
    res.status(500).send({ Error: 'Something failed!' });
  }
};

module.exports = { getChannels };

const Channel = require('../models/Channel');

const findChannels = async () => {
  let channels;
  try {
    channels = await Channel.find();
  } catch (err) {
    console.error(`Error finding channels: ${err}`);
  }
  return channels;
};

const getContentsRating = contents => contents.map(content => content.rating);

const getChannelContentsRatings = channel => {
  let ratings = [];
  if (channel.contents && channel.contents.length) {
    ratings = [...ratings, ...getContentsRating(channel.contents)];
  }

  let subchannelsRatings = [];
  if (channel.subchannels && channel.subchannels.length) {
    channel.subchannels.forEach(subchannel => {
      subchannelsRatings = [...subchannelsRatings, ...getChannelContentsRatings(subchannel)];
    });
  }
  ratings = [...ratings, ...subchannelsRatings];
  return ratings;
};

const calculateAverage = ratings => ratings.reduce((prev, curr) => prev + curr) / ratings.length;

const calculateChannelsRatingsAverage = channelsRatings =>
  channelsRatings.map(channel => {
    const ratingAverage = channel.ratings.length ? calculateAverage(channel.ratings) : 0;
    return {
      title: channel.title,
      ratingAverage
    };
  });

const collectChannelsRatings = channels => {
  const channelsRatings = [];
  channels.forEach(channel => {
    const ratings = getChannelContentsRatings(channel);
    channelsRatings.push({
      title: channel.title,
      ratings
    });
  });
  return channelsRatings;
};

const sortChannelsByRating = channels => channels.sort((a, b) => b.ratingAverage - a.ratingAverage);

const makeDataRow = ({ title, ratingAverage }) => [title, ratingAverage];

const arrayToCsvString = channelsRatings => {
  const headers = ['Channel Title', 'Average Rating'];
  const data = [headers];
  channelsRatings.forEach(channel => data.push(makeDataRow(channel)));
  let csvString;
  data.forEach(row => {
    csvString = `${csvString}${row.join(';')}\n`;
  });
  return csvString;
};

const exportChannelRatingsToCsv = async (req, res) => {
  console.log('Exporting channels ratings average to csv...');
  const channels = await findChannels();
  const channelsRatings = collectChannelsRatings(channels);
  const channelsRatingsAverage = calculateChannelsRatingsAverage(channelsRatings);
  const channelsRatingsSorted = sortChannelsByRating(channelsRatingsAverage);
  const str = arrayToCsvString(channelsRatingsSorted);
  res.attachment('channels-ratings.csv');
  res.send(str);
  console.log('Channels rating sent successfully!');
};

module.exports = {
  collectChannelsRatings,
  getChannelContentsRatings,
  calculateChannelsRatingsAverage,
  calculateAverage,
  sortChannelsByRating,
  exportChannelRatingsToCsv
};

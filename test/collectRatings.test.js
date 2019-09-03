const {
  collectChannelsRatings,
  getChannelContentsRatings,
  calculateChannelsRatingsAverage,
  calculateAverage,
  sortChannelsByRating
} = require('../server/business/collectRatings');

const channel1 = {
  _id: 'ch1',
  title: 'title1',
  language: 'test',
  picture: 'test',
  subchannels: [],
  contents: []
};

const channel2 = {
  _id: 'ch2',
  title: 'title2',
  language: 'test',
  picture: 'test',
  subchannels: [],
  contents: [
    {
      _id: 'co1',
      type: 'test',
      content: 'test',
      metadata: {
        author: 'author'
      },
      rating: 5
    }
  ]
};

const channel3 = {
  _id: 'ch3',
  title: 'title3',
  language: 'test',
  picture: 'test',
  subchannels: [],
  contents: [
    {
      _id: 'co2',
      type: 'test',
      content: 'test',
      metadata: {
        author: 'author'
      },
      rating: 6
    },
    {
      _id: 'co3',
      type: 'test',
      content: 'test',
      metadata: {
        author: 'author'
      },
      rating: 8
    }
  ]
};

const channel4 = {
  _id: 'ch4',
  title: 'title4',
  language: 'test',
  picture: 'test',
  subchannels: [
    {
      _id: 'ch2',
      title: 'title2',
      language: 'test',
      picture: 'test',
      subchannels: [],
      contents: [
        {
          _id: 'co1',
          type: 'test',
          content: 'test',
          metadata: {
            author: 'author'
          },
          rating: 5
        }
      ]
    }
  ]
};

const channel5 = {
  _id: 'ch5',
  title: 'title5',
  language: 'test',
  picture: 'test',
  subchannels: [
    {
      _id: 'ch2',
      title: 'title2',
      language: 'test',
      picture: 'test',
      subchannels: [],
      contents: [
        {
          _id: 'co1',
          type: 'test',
          content: 'test',
          metadata: {
            author: 'author'
          },
          rating: 5
        }
      ]
    },
    {
      _id: 'ch3',
      title: 'title3',
      language: 'test',
      picture: 'test',
      subchannels: [],
      contents: [
        {
          _id: 'co2',
          type: 'test',
          content: 'test',
          metadata: {
            author: 'author'
          },
          rating: 6
        },
        {
          _id: 'co3',
          type: 'test',
          content: 'test',
          metadata: {
            author: 'author'
          },
          rating: 8
        }
      ]
    }
  ],
  contents: [
    {
      _id: 'co4',
      type: 'test',
      content: 'test',
      metadata: {
        author: 'author'
      },
      rating: 10
    }
  ]
};

const channels = [channel1, channel2, channel3, channel4, channel5];

const expectedChannelsRatings = [
  {
    title: 'title1',
    ratings: []
  },
  {
    title: 'title2',
    ratings: [5]
  },
  {
    title: 'title3',
    ratings: [6, 8]
  },
  {
    title: 'title4',
    ratings: [5]
  },
  {
    title: 'title5',
    ratings: [10, 5, 6, 8]
  }
];

const expectedChannelsRatingsAverage = [
  {
    title: 'title1',
    ratingAverage: 0
  },
  {
    title: 'title2',
    ratingAverage: 5
  },
  {
    title: 'title3',
    ratingAverage: 7
  },
  {
    title: 'title4',
    ratingAverage: 5
  },
  {
    title: 'title5',
    ratingAverage: 7.25
  }
];

const expectedSortedChannelsByRating = [
  {
    title: 'title5',
    ratingAverage: 7.25
  },
  {
    title: 'title3',
    ratingAverage: 7
  },
  {
    title: 'title2',
    ratingAverage: 5
  },

  {
    title: 'title4',
    ratingAverage: 5
  },
  {
    title: 'title1',
    ratingAverage: 0
  }
];

test('getChannelContentsRatings channel without contents and subchannels', () => {
  expect(getChannelContentsRatings(channel1)).toEqual(expect.arrayContaining([]));
});

test('getChannelContentsRatings channel with 1 content', () => {
  expect(getChannelContentsRatings(channel2)).toEqual(expect.arrayContaining([5]));
});

test('getChannelContentsRatings channel with 2 content', () => {
  expect(getChannelContentsRatings(channel3)).toEqual(expect.arrayContaining([6, 8]));
});

test('getChannelContentsRatings channel with 1 subchannel with 1 content', () => {
  expect(getChannelContentsRatings(channel4)).toEqual(expect.arrayContaining([5]));
});

test('getChannelContentsRatings channel with 1 content and 2 subchannels with 1 and 2 contents', () => {
  expect(getChannelContentsRatings(channel5)).toEqual(expect.arrayContaining([5, 6, 8, 10]));
});

test('collectChannelsRatings collect content ratings for channels', () => {
  expect(collectChannelsRatings(channels)).toMatchObject(expectedChannelsRatings);
});

test('calculateAverage [1]', () => {
  expect(calculateAverage([1])).toEqual(1);
});

test('calculateAverage [1, 1]', () => {
  expect(calculateAverage([1, 1])).toEqual(1);
});

test('calculateAverage [1, 2]', () => {
  expect(calculateAverage([1, 2])).toEqual(1.5);
});

test('calculateAverage [0, 10]', () => {
  expect(calculateAverage([0, 10])).toEqual(5);
});

test('calculateAverage [1, 2, 8, 9]', () => {
  expect(calculateAverage([1, 2, 8, 9])).toEqual(5);
});

test('calculateChannelsRatingsAverage calculates ratings average from channel content ratings', () => {
  expect(calculateChannelsRatingsAverage(expectedChannelsRatings)).toMatchObject(expectedChannelsRatingsAverage);
});

test('sortChannelsByRating sort channels by ratings average', () => {
  expect(sortChannelsByRating(expectedChannelsRatingsAverage)).toMatchObject(expectedSortedChannelsByRating);
});

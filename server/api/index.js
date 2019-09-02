const express = require('express');
const { getChannels } = require('./handlers/getChannels');
const { getChannel } = require('./handlers/getChannel');
const { getContent } = require('./handlers/getContent');

const router = express.Router();

router.get('/channels', getChannels);
router.get('/channel/:id', getChannel);
router.get('/content/:id', getContent);

module.exports = router;

# channels-app

This repository contains an API that provides DDBB Channels and Contents.

If you download this folder, do first `npm install`.

If you want run app on an specific port or define specific MongoDB URL you can create an .env file just like .env.template included in the project

To run this code do `npm start`.

To run unit tests do `npm run test`

There are three different enpoints depending if you want information about channels or contents:

- GET /api/channels

  The channels endpoint returns a list with all channels

- GET /api/channel/{id}

  The channel endpoint returns the channel information by id

- GET /api/content/{id}

  The content endpoint returns the content information by id

Examples of use:

- http://localhost:3000/api/channels
- http://localhost:3000/api/channel/5d6a78bab216a7359c66cfa5
- http://localhost:3000/api/content/5d6a768416e7da4b683b4f2c

There is and endpoint to download Channels Ratings average in a CSV file:

- GET /channels-rating

Example of use:

- http://localhost:3000/channels-rating

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const settings = {
    env: {},
    devIndicators: {
        autoPrerender: false,
    },
};

module.exports =
    process.env.NODE_ENV === 'development'
        ? settings
        : withPWA({
              dest: 'public',
              register: true,
              skipWaiting: true,
          });

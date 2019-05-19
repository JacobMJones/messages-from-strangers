require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Oswald`,
            subsets: [`latin`],
          },
          {
            family: `Raleway`,
            subsets: [`latin`],
          },
          {
            family: 'Roboto',
            variants: ['400', '400i', '700', '700i'],
            subsets: ['latin-ext'],
          },
        ],
      },
    },
    {resolve:`gatsby-plugin-styled-components`},
  ],
};

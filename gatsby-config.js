require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
  })

  plugins: [`gatsby-transformer-sharp`, `gatsby-plugin-sharp`]
  
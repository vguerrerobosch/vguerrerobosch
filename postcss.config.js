const production = process.env.HUGO_ENVIRONMENT === 'production'

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    production && require('cssnano')
  ]
}

const purgecss = require('@fullhuman/postcss-purgecss')({

  content: [
    './layouts/**/*.html'
  ],

  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // purgecss
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}

const production = process.env.HUGO_ENVIRONMENT === 'production'

module.exports = {
  purge: {
    enabled: production,
    content: [
      './assets/js/**/*.js',
      './content/**/*.html',
      './layouts/**/*.html'
    ]
  },
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
        'grey': '#1D1F25',
        'white': '#dadada',
        'monstera-green': '#3CFFD8'
      },
      'height': {
        '0': 0
      }
    }
  },
  variants: {},
  plugins: []
}

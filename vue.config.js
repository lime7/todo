module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/todo/'
    : '/',
  css: {
    extract: false
  }
}

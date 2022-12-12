const proxy = [
    {
      context: '/api',
      target: 'http://localhost:8080/visitante-api',
      pathRewrite: {'^/api':''}
    }
  ];
  module.exports = proxy;
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/posts',
  method: 'POST'
};

const req = http.request(options, (res) => {
  console.log(res.statusCode);s

  res.on('data', (chunk) => {
    // Обрабатываем полученные данные
    console.log(chunk);
  });

  res.on('end', () => {
    console.log('Запрос завершен');
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end()
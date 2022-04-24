const allowedCors = [
  'https://api.0R8-9dzcl.nomoredomains.work',
  'http://api.0R8-9dzcl.nomoredomains.work',
  'https://0R8-9dzcl.nomoredomains.work',
  'http://0R8-9dzcl.nomoredomains.work',
];
// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  console.log(req.headers.origin);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    console.log('domen is coorect');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    console.log(req.headers.origin);
    res.status(200).send();
    return;
  }
  next();
};

module.exports = cors;

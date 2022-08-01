const express = require('express');
const app = express();

// const saltRounds = 12;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';


/** 1) Install and require 'helmet'*/
const helmet = require('helmet');

/** 2) Use helmet.hidePoweredBy()*/
app.use(helmet.hidePoweredBy());

/** 3) Migrate the rick of clickjacking - 'helmet.frameguard()'*/
app.use(helmet.frameguard({action: "deny"}));

/** 4) Mitigate the rick of XSS - 'helmet.xssFilter()' */
app.use(helmet.xssFilter());

/** 5) Avoid inferring the response MINE type - 'helmet.noSniff()' */
app.use(helmet.noSniff());

/** 6) Prevent IE from opening *untrusted* HTML - 'helmet.ieNoOpen()' */
app.use(helmet.ieNoOpen());

/** 7) Ask browsers to access your site via HTTPS only - 'helmet.hsts()' */
let ninetyDaysInSeconds = 90*24*60*60

app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));

/** 8) Disable DNS Prefetching - 'helmet.dnsPerfetchControl()' */
app.use(helmet.dnsPrefetchControl());

/** 9) Disable Client-Side Caching - 'helmet.noCache()' */
app.use(helmet.noCache());

/** Content Security Policy - 'helmet.contentSecurityPolicy()' */
app.use(helmet.contentSecurityPolicy({
  directives: {  
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "trusted-cdn.com"]
  }
}));



























module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

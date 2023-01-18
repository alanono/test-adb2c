const express = require('express');
const { Provider } = require('oidc-provider');
const path = require('path');
const app = express();
//Middlewares
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const configuration = {
  clients: [{
    client_id: "827231e9-9e10-4cd9-9b70-0886687023de",
    client_secret: "66546A576E5A7234753778214125442A472D4B6150645367556B587032733576",
    grant_types: ["authorization_code"],
    redirect_uris: ["https://test-adb2c.onrender.com/auth/login/callback", "https://oidcdebugger.com/debug"],
    response_types: ["code",],
  }],
  pkce: {
    required: () => false,
  },
  features: {
    requestObjects: {
      requireUriRegistration: false,
    },
  },
};
const oidc = new Provider('https://test-adb2c.onrender.com/', configuration);
app.use("/oidc", oidc.callback());
app.listen(3000, function () {
  console.log('OIDC is listening on port 3000!');
});

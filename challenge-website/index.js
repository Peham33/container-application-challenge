const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//tests part 1 (compose)
require('./compose-tests')(app);
//tests part 2 (kubernetes)
require('./api-validation')(app);
require('./ingress-validation')(app);
require('./validate-kubernetes-database')(app);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

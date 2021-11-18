const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//tests part 1 (compose)
require('./compose-tests')(app);
//validation samples (use as templates)
require('./validation-samples')(app);
require('./ingress-validation')(app);
require('./validate-kubernetes-database')(app);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

import express from 'express';

const app = express();
app.use(express.static('public'));
app.use('/auth0', express.static('node_modules/auth0-js/build'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));

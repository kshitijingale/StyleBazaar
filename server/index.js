const config = require('./config/index');
const app = require('./app');

app.listen(config.PORT, () => {
    console.log(`App is running at http://localhost:${config.PORT}`);
})

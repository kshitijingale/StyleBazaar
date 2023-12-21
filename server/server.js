const config = require('./config/index');
const app = require('./app');

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
})

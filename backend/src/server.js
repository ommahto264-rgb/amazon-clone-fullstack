require('dotenv').config();
const app = require('./app');
const pool = require('./config/db')

const PORT = 3000;
pool.connect().then(()=>{
    console.log('Connected')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
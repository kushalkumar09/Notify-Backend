const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
app.post("/register", function (req, res) {
    res.json('ok working fine')
    
}).listen(4000, () => { console.log(`listening on http://localhost:4000`) })
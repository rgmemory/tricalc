const express = require('express')
const path = require('path'); // Usually moved to the start of file

const app = express();

app.use(express.static(path.join(__dirname, '../build')))




app.listen(3400, () => {
    console.log('listening on port 3450')
})


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
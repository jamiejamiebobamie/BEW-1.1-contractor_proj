const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
let pledges = [
  { name: "Mr. Eric Federberg", amount: "1,000,000" },
  { name: "Mr. and Mrs. Eren and Emily Cross", amount: "2,000" }
]

// INDEX
app.get('/', (req, res) => {
  res.render('pledges-index', { pledges: pledges });
})

app.listen(7000, () => {
  console.log('App listening on port 7000!')
})

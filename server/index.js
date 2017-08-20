const express = require('express');
const Virtual = require('./virtual-box');
const app  = express();
const cors = require('cors')
const PORT = 4444;

let wm = {
  12: new Virtual()
};

const response = (data, status = 200) => ({ status, data });

// Cheking if wm is set
const isWmInit = (callback) => {
  return (req, res) => {
    const id = req.params.id;

    if(!wm[id]) {
      return res.json({
        status: 404,
        message: `Virtual id is not set`
      })
    }

    callback(req, res, id);
  }
};


app.use(cors())

app.get('/', (req, res) => {
  res.send('App is running');
});


app.get('/wm/:id', (req, res) => {
  const id = req.params.id;

  if(!wm[id]) {
    wm[id] = new Virtual({});
  }

  res.json({
    status: 200,
    message: `Virtual machine was started by id`
  });
});

app.get('/wm/:id/add', isWmInit((req, res, id) => {
  const { code } = req.query;
  wm[id].addContainer(code);
  res.send({
    status: 200
  })
}))

app.get('/wm/:id/run', isWmInit((req, res, id) => {
  // wm[id].on('data', (data) => {
  //   res.json(response(data))
  // });

  wm[id].on('error', (err) => {
    res.json(response(err, 404))
  });

  res.json(response(wm[id].runAll()))
}));


app.listen(PORT, _ => {
  console.log(`App listen on ${PORT}`);
});









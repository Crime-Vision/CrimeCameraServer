var express = require('express');
var router = express.Router();
var nodes = require('../models/nodes');

router.get('/', async (req, res) => {
  nodes.find({}, function (err, docs) {
    if (err) {
      res.send(err);
    } else {
      var response = [];
    }
    res.send(docs);
  });
});

router.get('/recentlyCheckedIn', async (req, res) => {
  var timeframe = 60 * 60 * 1000; //One Hour
  
  nodes.find({
    lastCheckIn: {
      $gt: new Date(Date.now() - timeframe)
    }
  }, function (err, docs) {
    if(err) {
      res.send(err);
    } else {
      res.send(docs);      
    }
  })
});

router.get('/:nodeName', async (req, res) => {
  nodes.findOne({ name: req.params.nodeName }, function (err, doc) {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(doc);
      res.end();
    }
  });
});

router.post('/:nodeName', async (req, res) => {
  nodes.findOneAndUpdate({ name: req.params.nodeName }, { $set: req.body }).exec(function (err, node) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(node);
    }
  });
});

module.exports = router;

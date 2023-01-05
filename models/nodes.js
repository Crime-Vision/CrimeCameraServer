const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, default: '' },
  lastCheckIn: { type: Date, default: new Date() },
  config: {
    hostName: { type: String, default: '' },
    ip: { type: String, default: 'CONFIGURE' },
    locationLat: { type: Number, default: 0 },
    locationLong: { type: Number, default: 0 },
    videoDriveEncryptionKey: { type: String, default: '' },
    buddyDriveEncryptionKey: { type: String, default: '' },
  },
  // Default
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model('Nodes', schema);

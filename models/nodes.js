const mongoose = require('mongoose');
const { Schema } = require('mongoose');

/********
 * Cameras Format *
 *
 * { localIP: "10.10.5.1-255", rtspURL: "rtsp://.../", ptz_capability: false, humanReadableName: "Direction and Location" }
 */

const Camera = mongoose.Schema({
  localIP: { type: String, default: '10.10.5.1' },
  rtspURL: { type: String, default: 'rtsp://.../'},
  ptz: { type: Boolean, default: false },
  humanReadableName: { type:String, default:"Direction and Location"},
  cameraNumber: {type: Number, default: 1}
}, {_id: false} );

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
    rtspUsername: { type: String, default: ''},
    rtspPassword: { type: String, default: ''},
    cameras: [Camera]
  },
  // Default
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model('Nodes', schema);

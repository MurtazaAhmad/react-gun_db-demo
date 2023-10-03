// This file serves as a Relay Peer
const express = require("express");
const Gun = require("gun");
const app = express();
const PORT = 5000;
app.use(Gun.serve);

const server = app.listen(PORT, () => {
  console.log("Listening at PORT:" + PORT);
});

Gun({ web: server });

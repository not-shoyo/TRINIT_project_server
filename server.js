const express = require("express");
const port = 5000;

const app = express();

const { exec } = require("child_process");
const { stdout } = require("process");

app.get("/getSizeFromUrl", (req, res) => {
  exec(`curl -so /dev/null ${req.body.url} -w '%{size_download}`, (err, stdout, stderr) => {
    if (err) {
      console.log("Shell error:", stderr);
      return stderr;
    }
    return stdout;
  }).then((result) => res.json({ resultSize: result }));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

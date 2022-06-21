require("dotenv").config();

const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5050", 10);

app.get("/public/:folder/:file", (req, res) => {
  res.sendFile(`${__dirname}/public/${req.params.folder}/${req.params.file}`);
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});

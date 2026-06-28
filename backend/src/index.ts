import app from "./server.js";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

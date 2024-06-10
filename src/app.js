require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/not-found");
const authRouter = require("./routes/auth-route");

const authenticate = require("./middlewares/authenticate");

const app = express();

app.use(cors());
app.use(morgan("dev"));
// app.use(limiter);
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", authenticate);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));

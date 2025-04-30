import express from "express";
import cors from "cors";

import postRouter from "./routes/postRoutes.js";

const app = express();

const corsOptions = {
  origin: "*", 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],  
  allowedHeaders: ["Content-Type", "Authorization"],  
  optionsSuccessStatus: 204,  
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" })); 
app.use(express.urlencoded({ extended: true, limit: "16kb" })); 

app.use("/api/v1/posts", postRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export { app };

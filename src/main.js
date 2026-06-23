import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/mongo.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import postImageRoutes from "./routes/postImage.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const swaggerDocument = YAML.load("./docs/swagger.yaml");

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({
        application: "UnaHur Anti-Social Net",
        status: "running"
    });
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/tags", tagRoutes);
app.use("/images", postImageRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
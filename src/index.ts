import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import express,{ NextFunction, Request, Response } from "express";
import routes from "./routes/api";



const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// root route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// API routes
app.use("/api", routes);

//  handle 404 errors
app.use((req: Request, res: Response) => {
    res.status(404).json({
      message: `Route ${req.originalUrl} not found`,
    });
});


const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}
startServer();
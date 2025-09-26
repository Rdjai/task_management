import express from 'express'
import { db } from './src/config/db.config.js'
import { errorHandler, notFound } from './src/middlewares/error.middleware.js'
import env from 'dotenv'
import userRoute from './src/routes/user.route.js'
import adminRoutes from './src/routes/admin.route.js'
import taskRoutes from './src/routes/task.routes.js'
import cors from 'cors'
import morgan from 'morgan'
env.config();
db();
const app = express();



app.use(morgan('dev'));
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));
app.use(express.json())
app.get("/api/v1/health", (req, res) => res.json({ status: "ok", time: new Date() }));
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/task', taskRoutes)
app.get("/", (req, res) => {
    res.send("task management server started")
})






app.listen(3000, () => {
    console.log("server started ✅");
})


app.use(errorHandler)
app.use(notFound)
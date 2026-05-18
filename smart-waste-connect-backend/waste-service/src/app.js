import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import wasteRoutes from './routes/wasteRoutes.js'
import logger from "./lib/logger.js";

dotenv.config()
const app = express()
app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true
}))

app.get('/waste/health', (req, res) => res.json({ status: 'ok', service: 'waste' }));
// Fix parameter order
app.get('/', (req, res) => {
    res.send('Smart Waste [waste-service] is running properly')
});
app.use('/waste', wasteRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`✅ Waste service running on port ${PORT}`);
  // console.log(`✅ Auth service running on port ${PORT}`);
});

export default app;
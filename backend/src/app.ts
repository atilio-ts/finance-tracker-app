import "dotenv/config"
import express from "express"
import helmet from "helmet";
import rateLimit from "express-rate-limit"
import slowDown from "express-slow-down";
import { userRoutes } from "./routes/users"
import { transactionRoutes } from "./routes/transactions"
import { accountRoutes } from "./routes/accounts"

//Limiters, body-parser and security
const PORT = process.env.PORT ?? 3001;
const app = express();

app.use(express.json());
app.use(helmet());
app.disable('x-powered-by');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 100, // allow 100 requests per 15 minutes, then...
    delayMs: 500 // begin adding 500ms of delay per request above 100:
    // request # 101 is delayed by  500ms
    // request # 102 is delayed by 1000ms
    // request # 103 is delayed by 1500ms
    // etc.
});
app.use(speedLimiter);

//Routers
app.use(userRoutes);
app.use(transactionRoutes);
app.use(accountRoutes);

//Listen
console.clear();
app.listen(PORT, () => console.log (`Server listening on ${PORT}`))
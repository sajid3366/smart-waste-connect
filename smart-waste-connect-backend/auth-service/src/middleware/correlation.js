import { v4 as uuidv4 } from "uuid";
import logger from "../lib/logger.js";

export default function correlationIdMiddleware(req, res, next) {
  const correlationId = req.headers["x-correlation-id"] || uuidv4();
  req.correlationId = correlationId;
  res.setHeader("x-correlation-id", correlationId);

  logger.info({
    message: "Incoming request",
    correlationId,
    method: req.method,
    path: req.originalUrl,
  });

  next();
}

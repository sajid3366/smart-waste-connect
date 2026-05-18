import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: "info",
  defaultMeta: { service: "waste-service" }, // ✅ Always include service name
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, "waste-service.log"),
    }),
    new transports.Console(), // Optional: log to terminal also
  ],
});

export default logger;

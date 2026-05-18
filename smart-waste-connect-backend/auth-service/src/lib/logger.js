import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: "info",
  defaultMeta: { service: "auth-service" }, // ✅ Always include service name
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, "auth-service.log"),
    }),
    new transports.Console(), // optional: shows logs in Docker console
  ],
});

export default logger;

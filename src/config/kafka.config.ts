import { Kafka, logLevel } from "kafkajs";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || ""],
  ssl: {
    rejectUnauthorized: true,
    // Ensure the certs folder exists in your dist/config/ directory after build
    ca: [fs.readFileSync(path.resolve(__dirname, './certs/ca.pem'), 'utf-8')],
  },
  sasl: {
    mechanism: "plain", // Or "scram-sha-256" based on your Aiven settings
    username: process.env.KAFKA_USERNAME || "",
    password: process.env.KAFKA_PASSWORD || "",
  },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
// Note: We don't export the manual consumer here anymore as Lambda handles it 

export const connectKafkaProducer = async () => {
  await producer.connect();
};


//AWS Update
// import { Kafka, logLevel } from "kafkajs";
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Replicate __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const kafka = new Kafka({
//   brokers: [process.env.KAFKA_BROKER || ""],
//   ssl: {
//     rejectUnauthorized: true,
//     // Note: ensure the 'certs' folder is inside your 'src/config' or 'dist/config' 
//     // depending on where this file is running from.
//     ca: [fs.readFileSync(path.resolve(__dirname, './certs/ca.pem'), 'utf-8')],
//   },
//   sasl: {
//     mechanism: "plain",
//     username: process.env.KAFKA_USERNAME || "",
//     password: process.env.KAFKA_PASSWORD || "",
//   },
//   logLevel: logLevel.ERROR,
// });

// export const producer = kafka.producer();
// export const consumer = kafka.consumer({ groupId: "chats" });

// export const connectKafkaProducer = async () => {
//   await producer.connect();
// };
import serverless from "serverless-http";
import { app } from "./index.js"; 
import prisma from "./config/db.config.js";

// 1. Export the HTTP handler for API Gateway (Handles Express routes)
export const httpHandler = serverless(app);

// 2. Export the Kafka handler (Triggered by AWS Event Source Mapping)
export const kafkaHandler = async (event: any) => {
    // AWS Lambda receives Kafka records in an object mapped by topic-partition
    for (const key in event.records) {
        const records = event.records[key];
        for (const record of records) {
            try {
                // AWS provides record values in Base64 [cite: 4]
                const msgValue = Buffer.from(record.value, 'base64').toString();
                const data = JSON.parse(msgValue);

                // Save to Supabase using your existing Prisma instance [cite: 13]
                await prisma.chats.create({
                    data: {
                        group_id: data.group_id,
                        name: data.name,
                        message: data.message,
                    },
                });
                console.log("Successfully saved message to Supabase");
            } catch (error) {
                console.error("Failed to process Kafka record:", error);
            }
        }
    }
};
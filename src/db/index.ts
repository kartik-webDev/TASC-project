import {drizzle} from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import path from "path"

config({path: ".env.local"})
 
const sql = neon(process.env.DB_URL!)

// logger
//  const db = drizzle(sql, {logger: true})
const db = drizzle(sql)

export default db
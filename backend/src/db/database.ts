import sqlite3 from "sqlite3"
import path from "path"

// CAMBIO: Usar directorio persistente para la base de datos
const dbPath = path.resolve("/app/data", "transcendence.db")
/*const dbPath = path.resolve(__dirname, '../../transcendence.db');*/
const db = new sqlite3.Database(dbPath)

export default db

// Libreria para leer, escribir, eliminar archivos. (FILE SYSTEM)
import fs from "fs"
// Libreria para crear rutas de archivos de forma segura, independientemente del sistema operativo
import path from "path"
import db from "./database"

export async function initializeDatabase() {
  // CAMBIO: Ruta del archivo init.sql
  const initSqlPath = path.resolve(__dirname, "../../src/db/init.sql")
  /*const initSqlPath = path.resolve(__dirname, 'init.sql');*/
  console.log("🔍 Buscando init.sql en:", initSqlPath)

  const initSql = fs.readFileSync(initSqlPath, "utf8")
  console.log("✅ Archivo init.sql leído correctamente")

  return new Promise<void>((resolve, reject) => {
    db.exec(initSql, (err) => {
      if (err) {
        console.error("Failed to initialize database:", err)
        reject(err)
      } else {
        console.log("Database initialized successfully.")
        resolve()
      }
    })
  })
}

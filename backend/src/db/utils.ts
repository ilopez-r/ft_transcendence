//src/db/utils.ts

import db from './database';

export function runQuery(sql: string, params: any[]): Promise<number> {
	return new Promise((resolve, reject) => {
		db.run(sql, params, function (err) {
			if (err) reject (err);
			else resolve(this.lastID || this.changes);
		});
	});
}

// Devuelve un solo registro
export const getQuery = <T = any>(sql: string, params: any[] = []): Promise<T> => {
	return new Promise((resolve, reject) => {
		db.get(sql, params, (err, row) => {
			if (err) reject (err);
			else resolve (row as T);
		});
	});
};

// Devuelve multiples registros
export const getAll = <T = any>(sql: string, params: any[] = []): Promise<T> => {
	return new Promise((resolve, reject) => {
		db.get(sql, params, (err, row) => {
			if (err) reject(err);
			else resolve(row as T);
		})
	});
};

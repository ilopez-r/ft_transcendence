-- src/db/init.sql

CREATE TABLE IF NOT EXISTS users (
	user_id INTEGER PRIMARY KEY AUTOINCREMENT,
	email TEXT NOT NULL UNIQUE,
	password_hash TEXT NOT NULL,
	display_name TEXT NOT NULL UNIQUE,
	avatar TEXT,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP,
	twofa_enabled BOOLEAN DEFAULT true,
	twofa_verified BOOLEAN DEFAULT false,
	twofa_code TEXT,
	twofa_expires_at INTEGER
);

CREATE TABLE IF NOT EXISTS stats (
	user_id INTEGER PRIMARY KEY,
	games_played INTEGER DEFAULT 0,
	games_won INTEGER DEFAULT 0,
	lost_games INTEGER DEFAULT 0,
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS friends (
	user_id INTEGER,
	friend_id INTEGER,
	friend_state TEXT CHECK(friend_state IN ('pending', 'accepted', 'blocked')),
	PRIMARY KEY(user_id, friend_id),
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY(friend_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	sender_id INTEGER NOT NULL,
	receiver_id INTEGER NOT NULL,
	message_ TEXT NOT NULL,
	sent_at TEXT DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY(receiver_id) REFERENCES users(user_id) ON DELETE CASCADE	
);

CREATE TABLE IF NOT EXISTS game (
	game_id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	display_name TEXT NOT NULL UNIQUE,
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

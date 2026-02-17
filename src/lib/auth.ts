import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "src/data/users.json");
const SESSIONS_FILE = path.join(process.cwd(), "src/data/sessions.json");

type User = { username: string; passwordHash: string };
type Session = { id: string; username: string; expiresAt: number };

function getUsers(): User[] {
  if (!fs.existsSync(USERS_FILE)) {
    const defaultHash = bcrypt.hashSync("admin123", 10);
    const users = [{ username: "admin", passwordHash: defaultHash }];
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return users;
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

function getSessions(): Session[] {
  if (!fs.existsSync(SESSIONS_FILE)) {
    fs.writeFileSync(SESSIONS_FILE, "[]");
    return [];
  }
  return JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
}

function saveSessions(sessions: Session[]) {
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
}

export function authenticate(username: string, password: string): string | null {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.passwordHash)) return null;

  const sessions = getSessions().filter((s) => s.expiresAt > Date.now());
  const session: Session = {
    id: uuidv4(),
    username,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  sessions.push(session);
  saveSessions(sessions);
  return session.id;
}

export function validateSession(sessionId: string): boolean {
  const sessions = getSessions();
  const session = sessions.find((s) => s.id === sessionId && s.expiresAt > Date.now());
  return !!session;
}

export function destroySession(sessionId: string): void {
  const sessions = getSessions().filter((s) => s.id !== sessionId);
  saveSessions(sessions);
}

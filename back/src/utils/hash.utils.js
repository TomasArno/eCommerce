import { createHash as hash } from 'node:crypto';

const createHash = (password) => hash('sha256', password).digest('hex');
const verifyHash = (enteredPassword, db) => enteredPassword === db;

export { createHash, verifyHash };

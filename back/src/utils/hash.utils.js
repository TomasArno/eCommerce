import { createHash as hash } from 'node:crypto';

const createHash = (password) => hash('sha256').update(password.toString()).digest('hex');

export { createHash };


import path from 'node:path';

// Local values live in .env (not committed). Real environment variables win over the file.
try {
    process.loadEnvFile(path.join(process.cwd(), '.env'));
} catch {
    // no .env file: rely on whatever is already in the environment
}

export function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable ${name}. Copy .env.example to .env and fill it in.`);
    }
    return value;
}

export function optional(name: string, fallback = ''): string {
    return process.env[name] || fallback;
}

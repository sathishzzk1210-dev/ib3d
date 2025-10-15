-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create database if not exists
SELECT 'CREATE DATABASE printflow'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'printflow');
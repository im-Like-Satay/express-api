const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres.hzvxmwcqypoorkcvfcja",
  host: "aws-1-ap-south-1.pooler.supabase.com",
  database: "postgres",
  password: "@aurusHidis!867",
  port: 5432,
});

module.exports = pool;

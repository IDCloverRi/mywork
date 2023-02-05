import mysql from "mysql2";

const db = mysql.createConnection({
  user: "root",
  host: "localhost",

  database: "test",
});

db.connect((err) => {
  if (err) throw err;
  console.log("DB connected");
});

export default db;

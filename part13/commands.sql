CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL,
 likes INTEGER);

INSERT INTO blogs (author, url, title, likes) VALUES ('full-stack developer', 'www.blogs.com','SQL database is great',8);

INSERT INTO blogs (author, url, title, likes) VALUES ('full-stack developer', 'www.blogs.com','PostgreSQL is a advanced open source relational database',10);

// --------------------------------
-- ref: https://www.postgresql.org/docs/15/sql-commands.html
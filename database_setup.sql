-- Change user name and password here 
CREATE USER 'polling_app'@'localhost' IDENTIFIED BY '12345';
CREATE DATABASE IF NOT EXISTS polling_app;
-- change here as well
GRANT SELECT, INSERT, UPDATE ON polling_app.* TO 'polling_app'@'localhost';
REVOKE ALTER, DROP ON polling_app.* FROM 'polling_app'@'localhost';
FLUSH PRIVILEGES;
USE polling_app;
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name TINYTEXT NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS polls (
    poll_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE IF NOT EXISTS questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    poll_id INT,
    question_text VARCHAR(255) NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES polls(poll_id)
);

CREATE TABLE IF NOT EXISTS options (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    option_text VARCHAR(255) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS votes (
    vote_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    poll_id INT,
    question_id INT,
    option_id INT,
    vote_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (poll_id) REFERENCES polls(poll_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (option_id) REFERENCES options(option_id)
);

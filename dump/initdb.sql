use helpper

SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;

CREATE TABLE IF NOT EXISTS user (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  deletedAt datetime DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);

CREATE TABLE IF NOT EXISTS authtokens (
  id int(11) NOT NULL AUTO_INCREMENT,
  token varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  deletedAt datetime DEFAULT NULL,
  userid int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY userid (userid),
  CONSTRAINT authtokens_ibfk_1 FOREIGN KEY (userid) REFERENCES user (id) ON DELETE SET NULL ON UPDATE CASCADE
);
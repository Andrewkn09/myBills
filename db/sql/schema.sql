CREATE DATABASE IF NOT EXISTS myBills;
USE myBills;

DROP TABLE IF EXISTS companies;
CREATE TABLE companies(
  id INT AUTO_INCREMENT ,
  companyName VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY(companyName)
);

DROP TABLE IF EXISTS bills;
CREATE TABLE bills(
  id INT AUTO_INCREMENT,
  companyID INT NOT NULL,
  amount decimal (10, 2) NOT NULL,
  datePaid VARCHAR(255), 
  PRIMARY KEY(id)
);

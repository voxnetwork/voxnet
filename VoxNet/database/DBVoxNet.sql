CREATE DATABASE VoxNet;
USE VoxNet;

CREATE TABLE Devices (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100),
    ip_address VARCHAR(20),
    tipo VARCHAR(100),
    creation_date DATE
);

CREATE TABLE Tests (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    device_id INT,
    status VARCHAR(100),
    latency DOUBLE,
    tempo TIME,
    FOREIGN KEY (device_id) references devices (id) 
);
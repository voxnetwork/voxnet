create database voxnet;
use voxnet;

create table devices (
	id int primary key unique not null auto_increment,
    nome varchar(100),
    ip_address varchar(15),
    tipo enum('PC', 'roteador', 'servidor'),
    data_criacao datetime
);

create table tests (
	id int primary key unique not null auto_increment,
    device_id int,
    status enum('online', 'offline'),
    latencia float null,
    tempo datetime,
    foreign key (device_id) references devices (id) 
);
create database voxnet;
use voxnet;

create table Dispositivo (
	id int primary key unique not null auto_increment,
    nome varchar(100),
    ip_address varchar(15),
    tipo enum('PC', 'roteador', 'servidor'),
    data_criacao datetime
);

create table testes (
	id int primary key unique not null auto_increment,
    dispositivo_id int,
    status enum('online', 'offline'),
    latencia float null,
    tempo datetime,
    foreign key (dispositivo_id) references Dispositivo (id) 
);
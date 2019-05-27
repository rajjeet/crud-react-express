USE mysql;

create database IF NOT EXISTS plexxis;

USE plexxis;
drop table IF EXISTS employee;

drop table IF EXISTS code;
create TABLE code (
    id int not null primary key auto_increment,
    name varchar(200)
);

insert into code (name) values ('F100'), ('F101'), ('F102'), ('F103'), ('F104');

drop table IF EXISTS profession;
create TABLE profession (
    id int not null primary key auto_increment,
    name varchar(200)
);

insert into profession (name) values ('Carpenter'), ('Plumber'), ('Engineer'), ('Architect'), ('Developer');

drop table IF EXISTS city;
create TABLE city (
    id int not null primary key auto_increment,
    name varchar(200)
);

insert into city (name) values ('Toronto'), ('Mississauga'), ('Brampton'), ('Oakville'), ('Vaughan');

drop table IF EXISTS branch;
create TABLE branch (
    id int not null primary key auto_increment,
    name varchar(200)
);

insert into branch (name) values ('Abacus'), ('Pillsworth');

create TABLE employee (
    id int not null primary key auto_increment,
    name varchar(200),
    codeId int NULL,
    professionId int NULL,
    cityId int NULL,
    branchId int NULL,
    assigned boolean DEFAULT false,
    constraint fk_employee_code foreign key (codeId) references code(id),
    constraint fk_employee_profession foreign key (professionId) references profession(id),
    constraint fk_employee_city foreign key (cityId) references city(id),
    constraint fk_employee_branch foreign key (branchId) references branch(id)
);


insert into employee (name, codeId, professionId, cityId, branchId, assigned)
values  ('Rajjeet'  , 1, 3, 3, 1, true),
        ('Jasmine'  , 5, 2, 3, 1, true),
        ('Ruby'     , 2, 1, 4, 2, false),
        ('Max'      , 4, 3, 1, 1, false),
        ('Jessie'   , 3, 5, 3, 2, false);


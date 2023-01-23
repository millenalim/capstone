drop database if exists capstone_project;
create database capstone_project;

use capstone_project;

create table `schedule` (
	schedule_id int primary key auto_increment,
    day_of_week varchar(10) not null,
    availability varchar(10) not null
);

create table app_user (
	app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    first_name varchar(50) null,
    last_name varchar(50) null,
    bio varchar(160) null,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_role (
	app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table `language` (
	language_id int primary key auto_increment,
	`language` varchar(20) not null
);

create table app_user_schedule (
	app_user_schedule_id int primary key auto_increment,
    app_user_id int not null,
    schedule_id int not null,
	constraint fk_app_user_schedule_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_app_user_schedule_schedule_id
		foreign key (schedule_id)
        references schedule(schedule_id)
);

create table app_user_role (
	app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

create table app_user_language (
	proficiency_level_id int primary key auto_increment,
    proficiency_level varchar(15) not null,
    app_user_id int not null,
    language_id int not null,
    constraint fk_app_user_language_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_app_user_language_language_id
		foreign key (language_id)
        references language(language_id)
);

-- data
insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- admins data, password: P@ssw0rd!
insert into app_user (username, password_hash, enabled)
    values
    ('zach@yau.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('morgan@oliver.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);
    -- ('millena@lim.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into app_user (username, password_hash, first_name, last_name, enabled)
	values 
	('millena@lim.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 'Millena', 'Lim', 1),
    ('john@williams.com','$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 'John', 'Williams',1),
    ('sarah@ryder.com','$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 'Sarah', 'Ryder', 1),
    ('gia@tanner.com','$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa','Gia','Tanner',1),
    ('kit@thompson.com','$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa','Kit', 'Thompson',1);
    
    
insert into app_user_role
    values
    (1, 2),
    (2, 2),
    (3, 1),
    (4,1),
    (5,1),
    (6,1),
    (7,1);
    
insert into `schedule` (schedule_id, day_of_week, availability) 
	values
	(1, 'MONDAY', 'Morning'),
    (2, 'MONDAY', 'Afternoon'),
    (3, 'MONDAY', 'Evening'),
    (4, 'TUESDAY', 'Morning'),
    (5, 'TUESDAY', 'Afternoon'),
    (6, 'TUESDAY', 'Evening'),
    (7, 'WEDNESDAY', 'Morning'),
    (8, 'WEDNESDAY', 'Afternoon'),
    (9, 'WEDNESDAY', 'Evening'),
    (10, 'THURSDAY', 'Morning'),
    (11, 'THURSDAY', 'Afternoon'),
    (12, 'THURSDAY', 'Evening'),
    (13, 'FRIDAY', 'Morning'),
    (14, 'FRIDAY', 'Afternoon'),
    (15, 'FRIDAY', 'Evening'),
    (16, 'SATURDAY', 'Morning'),
    (17, 'SATURDAY', 'Afternoon'),
    (18, 'SATURDAY', 'Evening'),
    (19, 'SUNDAY', 'Morning'),
    (20, 'SUNDAY', 'Afternoon'),
    (21, 'SUNDAY', 'Evening');
    
    
insert into `language` (`language`) values
    ('Java'),
    ('C'),
    ('C++'),
    ('C#'),
    ('JavaScript'),
    ('Python'),
    ('PHP'),
    ('SQL');
    
    describe app_user_language;
    insert into app_user_language (proficiency_level, app_user_id, language_id)  values
    ("Beginner", 1, 1),
	("Intermediate",2,2),
    ("Expert",3,3),
    ("Beginner",4,2),
    ("Intemediate",5,2),
    ("Intermediate",6,7),
    ("Expert",7,5);
    
    
    
describe app_user_schedule;

insert into app_user_schedule (app_user_id, schedule_id ) values 
    (1,1),
    (1,2),
    (2,1),
    (2,2),
    (3,10),
    (4,5),
    (5,18),
    (6,18),
    (7,12);
    


    
	
    
    


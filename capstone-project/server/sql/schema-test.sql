drop database if exists capstone_project_test;
create database capstone_project_test;
use capstone_project_test;

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
    proficieny_level varchar(15) not null,
    app_user_id int not null,
    language_id int not null,
    constraint fk_app_user_language_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_app_user_language_language_id
		foreign key (language_id)
        references language(language_id)
);

delimiter //
create procedure set_known_good_state()
begin

	delete from app_role;
    alter table app_role auto_increment = 1;
    delete from app_user_role;
    
    delete from app_user;
    alter table app_user auto_increment = 1;
	
    delete from app_user_schedule;

    delete from `schedule`;
    alter table `schedule` auto_increment = 1;
    
    delete from `language`;
    alter table `language` auto_increment = 1;
    
	

-- data
insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- admins data, password: P@ssw0rd!
insert into app_user (username, password_hash, enabled)
    values
    ('zach@yau.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('morgan@oliver.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('millena@lim.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into app_user_role
    values
    (1, 2),
    (2, 2),
    (3, 1);
    
insert into `schedule` (schedule_id, day_of_week, availability) 
	values
	(1, 'Monday', 'Morning'),
    (2, 'Monday', 'Afternoon'),
    (3, 'Monday', 'Evening'),
    (4, 'Tuesday', 'Morning'),
    (5, 'Tuesday', 'Afternoon'),
    (6, 'Tuesday', 'Evening'),
    (7, 'Wednesday', 'Morning'),
    (8, 'Wednesday', 'Afternoon'),
    (9, 'Wednesday', 'Evening'),
    (10, 'Thursday', 'Morning'),
    (11, 'Thursday', 'Afternoon'),
    (12, 'Thursday', 'Evening'),
    (13, 'Friday', 'Morning'),
    (14, 'Friday', 'Afternoon'),
    (15, 'Friday', 'Evening'),
    (16, 'Saturday', 'Morning'),
    (17, 'Saturday', 'Afternoon'),
    (18, 'Saturday', 'Evening'),
    (19, 'Sunday', 'Morning'),
    (20, 'Sunday', 'Afternoon'),
    (21, 'Sunday', 'Evening');
    
insert into `language` values
    (1,'Java'),
    (2, 'C'),
    (3, 'C++'),
    (4, 'C#'),
    (5, 'JavaScript'),
    (6, 'Python'),
    (7, 'PHP'),
    (8, 'SQL');
    
insert into app_user_schedule (app_user_id, schedule_id ) values 
    (1,1),
    (1,2),
    (2,1),
    (2,2);
    
end //
delimiter ;

drop database if exists capstone_project;
create database capstone_project;

create table schedule (
	schedule_id int primary key auto_increment,
    day_of_week varchar(10) not null,
    availability varchar(10) not null
);

create table app_user (
	app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    bio varchar(160) null,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_role (
	app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table language (
	language_id int primary key auto_increment,
	language varchar(20) not null
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




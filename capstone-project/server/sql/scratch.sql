use capstone_project;

select ar.*,au.* 
from app_role ar
inner join app_user_role aur on aur.app_role_id = ar.app_role_id
inner join app_user au on au.app_user_id = aur.app_user_id
where `name` = "USER";

select app_user_id, first_name, last_name, username, password_hash, bio, enabled 
from app_user;

select distinct s.schedule_id
from app_user au
inner join app_user_schedule aus on aus.app_user_id = au.app_user_id 
inner join `schedule` s on s.schedule_id = aus.schedule_id
where au.app_user_id = 1;

select distinct au.*
from app_user au
inner join app_user_schedule aus on aus.app_user_id = au.app_user_id
where aus.schedule_id in (select distinct s.schedule_id
from app_user au
inner join app_user_schedule aus on aus.app_user_id = au.app_user_id 
inner join `schedule` s on s.schedule_id = aus.schedule_id
where au.app_user_id = 1)
and au.app_user_id <> 1;

select aul.proficiency_level_id, aul.proficiency_level 
from app_user_language aul 
where aul.app_user_id = ?;

select aul.proficiency_level_id, aul.proficiency_level
from app_user_language aul 
inner join `language` l on l.language_id = aul.language_id
where aul.app_user_id = 1;

select * 
from `language`;

select * from `schedule`;

select * from app_user;

select * from app_user_role;
select * from app_role;

select * from app_user_language;

select * from app_user au
left outer join app_user_language aul on aul.app_user_id = au.app_user_id;

select * from app_user_language;

describe app_user_language;

select * from `schedule`;

select * from app_user_schedule;

 select app_user_id, schedule_id
 from app_user_schedule
where app_user_schedule.app_user_id = 5;

select au.*, aul.*, l.*, aus.*, s.* from app_user au
inner join app_user_language aul on aul.app_user_id = au.app_user_id
inner join `language` l on l.language_id = aul.language_id
inner join app_user_schedule aus on aus.app_user_id = au.app_user_id
inner join `schedule` s on s.schedule_id = aus.schedule_id
where au.app_user_id in (1);

-- Find all users with a matching schedule
select distinct app_user_schedule.app_user_id from app_user_schedule
where app_user_schedule.schedule_id in (select app_user_schedule.schedule_id from app_user_schedule 
where app_user_id = 1);

-- Find all users with a matching language
select distinct app_user_language.app_user_id from app_user_language
where app_user_language.language_id in (select app_user_language.language_id from app_user_language
where app_user_id = 1);


-- Find all the users that have that same schedule



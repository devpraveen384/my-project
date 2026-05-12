CREATE DATABASE company_dp;
use company_dp;

create table employes (
emp_id int PRIMARY KEY auto_increment,
name varchar (30),
email varchar (40),
deparment varchar (50),
city varchar (50),
created_at datetime
);


select  * from employes;

insert into employes (emp_id,name,email,deparment,city,created_at) value (101,upper("raman"),lower("ram@gmail.com"),"it","karur",now());



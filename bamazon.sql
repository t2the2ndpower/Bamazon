create database bamazon_db;

use bamazon_db;

create table products(
itemId INTEGER(15) NOT NULL AUTO_INCREMENT,
PRIMARY KEY (itemId),
productName varchar(40),
deptName varchar(40),
price INTEGER(2),
stockQty INTEGER(4)
);

use bamazon_db;

create table departments(
DeptId INTEGER(15) NOT NULL AUTO_INCREMENT,
PRIMARY KEY (DeptId),
deptName varchar(40),
overheadCost INTEGER(6)
);

use bamazon_db;

insert into products (productName, deptName, price, stockQty) values ("product 1", "dept 1", 50.00, 100);
insert into products (productName, deptName, price, stockQty) values ("product 2", "dept 2", 25.00, 120);
insert into products (productName, deptName, price, stockQty) values ("product 3", "dept 3", 10.00, 140);
insert into products (productName, deptName, price, stockQty) values ("product 4", "dept 4", 30.00, 160);
insert into products (productName, deptName, price, stockQty) values ("product 5", "dept 5", 35.00, 150);
insert into products (productName, deptName, price, stockQty) values ("product 6", "dept 6", 250.00, 300);
insert into products (productName, deptName, price, stockQty) values ("product 7", "dept 7", 15.00, 120);
insert into products (productName, deptName, price, stockQty) values ("product 8", "dept 8", 55.00, 170);
insert into products (productName, deptName, price, stockQty) values ("product 9", "dept 9", 12.00, 130);
insert into products (productName, deptName, price, stockQty) values ("product 10", "dept 10", 45.00, 300);
insert into products (productName, deptName, price, stockQty) values ("product 11", "dept 11", 500.00, 50);
insert into products (productName, deptName, price, stockQty) values ("product 12", "dept 12", 13.00, 450);
insert into products (productName, deptName, price, stockQty) values ("product 13", "dept 13", 52.00, 170);
insert into products (productName, deptName, price, stockQty) values ("product 14", "dept 14", 5.00, 146);
insert into products (productName, deptName, price, stockQty) values ("product 15", "dept 15", 11.00, 190);


use bamazon_db;

select * from products;

ALTER TABLE products MODIFY productName varchar(225);

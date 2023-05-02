INSERT INTO department (name) 
VALUES ('Finance'), ('Engineering'), ('Customer Service'), ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 50000, 1),
("Front End Dev", 60000, 2),
("Associate Dev", 55000, 2),
("Support Specialist", 80000, 3),
("Marketing Guru", 50000, 4),
("Guru Apprentice", 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Martha", "Stewart", 1, NULL),
("Jack", "Black", 2, NULL),
("Julia", "Roberts", 3, 2),
("Will", "Hunting", 4, NULL),
("Reagan", "Ridley", 5, NULL),
("Brett", "Hand", 6, 5);

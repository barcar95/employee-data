USE employee_db;

INSERT INTO department(name)
VALUES("finance"),
("IT"),
("sales");

INSERT INTO role(title, salary, department_id)
VALUES ("manager", 55000.00, 1),
("supervisor", 45000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carlos", "Bree", 1, null),
("Vanessa", "Duke", 2, 1);

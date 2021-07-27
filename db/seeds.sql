USE employees_db

INSERT INTO department(name)
	VALUES 
		("Sales"),
		("IT"),
		("Human Resources"),
		("Administration");
    
INSERT INTO role (title, salary, department_id)
	VALUES
		("Sales Manager", 100000, 1),
		("IT Manager", 120000, 2),
		("HR Director", 150000, 3),
		("Administration Director", 300000, 4);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES
		("LeBron", "James", 1, 1),
		("Kobe", "Bryant", 2, 2),
		("Michael", "Jordan", 3, 3),
		("Wilt", "Chamberlain", 4, 4);
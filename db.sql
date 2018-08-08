DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS maintenance;
DROP TABLE IF EXISTS maintenance_type;
DROP TABLE IF EXISTS acquisition;
DROP TABLE IF EXISTS acquisition_type;
DROP TABLE IF EXISTS tree;
DROP TABLE IF EXISTS tree_type;
DROP TABLE IF EXISTS tree_species;
DROP TABLE IF EXISTS tree_genus;
DROP TABLE IF EXISTS tree_family;

CREATE TABLE tree_family (
	id integer PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE tree_genus (
	id integer PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE tree_species (
	id integer PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE tree_type (
	id integer PRIMARY KEY,
	tree_family_id integer REFERENCES tree_family(id) NOT NULL,
	tree_genus_id integer REFERENCES tree_genus(id) NOT NULL,
	tree_species_id integer REFERENCES tree_species(id) NOT NULL
);

CREATE TABLE tree (
	id integer PRIMARY KEY,
	tree_type_id integer REFERENCES tree_type(id) NOT NULL
);

CREATE TABLE acquisition_type (
	id integer PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE acquisition (
	tree_id integer PRIMARY KEY REFERENCES tree(id),
	acquisition_type_id integer REFERENCES acquisition_type(id) NOT NULL,
	date date NOT NULL DEFAULT CURRENT_DATE,
	age integer,
	location TEXT,
	comment TEXT
);

CREATE TABLE maintenance_type (
	id integer PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE maintenance (
	id integer PRIMARY KEY,
	tree_id integer REFERENCES tree(id) NOT NULL,
	maintenance_type_id integer REFERENCES maintenance_type(id) NOT NULL
);

CREATE TABLE photo (
	id integer PRIMARY KEY,
	tree_id integer REFERENCES tree(id) NOT NULL,
	date date NOT NULL DEFAULT CURRENT_DATE,
	filePath VARCHAR(260) NOT NULL,
	comment TEXT
);
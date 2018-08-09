BEGIN;
DROP TABLE IF EXISTS photo CASCADE;
DROP TABLE IF EXISTS maintenance CASCADE;
DROP TABLE IF EXISTS maintenance_type CASCADE;
DROP TABLE IF EXISTS acquisition CASCADE;
DROP TABLE IF EXISTS acquisition_type CASCADE;
DROP TABLE IF EXISTS tree CASCADE;
DROP TABLE IF EXISTS tree_type CASCADE;
DROP TABLE IF EXISTS tree_species CASCADE;
DROP TABLE IF EXISTS tree_genus CASCADE;
DROP TABLE IF EXISTS tree_family CASCADE;
DROP VIEW IF EXISTS tree_view CASCADE;

CREATE TABLE tree_family (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	UNIQUE(name)
);

CREATE TABLE tree_genus (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	UNIQUE(name)
);

CREATE TABLE tree_species (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	UNIQUE(name)
);

CREATE TABLE tree_type (
	id SERIAL PRIMARY KEY,
	tree_family_id SERIAL REFERENCES tree_family(id) NOT NULL,
	tree_genus_id SERIAL REFERENCES tree_genus(id) NOT NULL,
	tree_species_id SERIAL REFERENCES tree_species(id) NOT NULL,
	UNIQUE(tree_family_id, tree_genus_id, tree_species_id)
);

CREATE TABLE acquisition_type (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	UNIQUE(name)
);

CREATE TABLE tree (
	id SERIAL PRIMARY KEY,
	tree_type_id SERIAL REFERENCES tree_type(id) NOT NULL
);

CREATE TABLE acquisition (
	id SERIAL PRIMARY KEY,
	tree_id SERIAL REFERENCES tree(id) NOT NULL,
	acquisition_type_id SERIAL REFERENCES acquisition_type(id) NOT NULL,
	date DATE NOT NULL DEFAULT CURRENT_DATE,
	age INTEGER,
	location TEXT,
	comment TEXT,
	UNIQUE(tree_id)
);

CREATE TABLE maintenance_type (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	UNIQUE(name)
);

CREATE TABLE maintenance (
	id SERIAL PRIMARY KEY,
	tree_id SERIAL REFERENCES tree(id) NOT NULL,
	maintenance_type_id SERIAL REFERENCES maintenance_type(id) NOT NULL,
	date DATE NOT NULL,
	comment TEXT
);

CREATE TABLE photo (
	id SERIAL PRIMARY KEY,
	tree_id SERIAL REFERENCES tree(id) NOT NULL,
	date date NOT NULL DEFAULT CURRENT_DATE,
	filePath VARCHAR(260) NOT NULL,
	comment TEXT
);

CREATE VIEW maintenance_view AS
	SELECT 
		maintenance.id,
		maintenance.tree_id,
		maintenance_type.id AS maintenance_type_id,
		maintenance_type.name AS maintenance_type_name,
		maintenance.date,
		maintenance.comment
	FROM maintenance
	INNER JOIN maintenance_type ON maintenance.maintenance_type_id = maintenance_type.id;

CREATE VIEW tree_view As
	SELECT
		tree.id AS id,
		tree_type.id AS tree_type_id,
		tree_family.id AS family_id,
		tree_family.name AS family,
		tree_genus.id AS genus_id,
		tree_genus.name AS genus,
		tree_species.id AS species_id,
		tree_species.name AS species,
		acquisition.id AS acquisition_id,
		acquisition.date AS acquisition_date,
		acquisition.age AS acquisition_age,
		acquisition.location AS acquisition_location,
		acquisition_type.name AS acquisition_type,
		acquisition.comment AS acquisition_comment FROM acquisition
	INNER JOIN tree ON acquisition.tree_id = tree.id
	INNER JOIN acquisition_type ON acquisition.acquisition_type_id = acquisition_type.id
	INNER JOIN tree_type ON tree.tree_type_id = tree_type.id
	INNER JOIN tree_family ON tree_type.tree_family_id = tree_family.id
	INNER JOIN tree_genus ON tree_type.tree_genus_id = tree_genus.id
	INNER JOIN tree_species ON tree_type.tree_species_id = tree_species.id;

-- could also provide an on "insert do instead" to view.

COMMIT;

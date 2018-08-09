BEGIN;

INSERT INTO acquisition_type (id, name) VALUES (0, 'Nursery Stock');
INSERT INTO acquisition_type (id, name) VALUES (1, 'Bonsai Nursery Stock');
INSERT INTO acquisition_type (id, name) VALUES (2, 'Cutting');
INSERT INTO acquisition_type (id, name) VALUES (3, 'Seedling');
INSERT INTO acquisition_type (id, name) VALUES (4, 'Air Layering');
INSERT INTO acquisition_type (id, name) VALUES (5, 'Yamadori');

---- TREES ----

-- coprosma
INSERT INTO tree_family (id, name) VALUES (0, 'Rubiaceae');
INSERT INTO tree_genus (id, name) VALUES (0, 'Coprosma');
INSERT INTO tree_species (id, name) VALUES (0, 'Kirkii');
INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) VALUES (0, 0, 0, 0);
INSERT INTO tree (id, tree_type_id) VALUES (0, 0);
INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location,	comment) VALUES (0, 0, 1, '2018-04-19', 2, 'Bonsai Enr', '');

-- crassula
INSERT INTO tree_family (id, name) VALUES (1, 'Crassulaceae');
INSERT INTO tree_genus (id, name) VALUES (1, 'Crassula');
INSERT INTO tree_species (id, name) VALUES (1, 'Ovata');
INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) VALUES (1, 1, 1, 1);
INSERT INTO tree (id, tree_type_id) VALUES (1, 1);
INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location,	comment) VALUES (1, 1, 0, '2018-05-04', 1, 'Fleuriste St-Elie, Sherbrooke', '');

-- acer palmatum
INSERT INTO tree_family (id, name) VALUES (2, 'Sapindaceae'); 
INSERT INTO tree_genus (id, name) VALUES (2, 'Acer');
INSERT INTO tree_species (id, name) VALUES (2, 'Palmatum');
INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) VALUES (2, 2, 2, 2);
INSERT INTO tree (id, tree_type_id) VALUES (2, 2);
INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location,	comment) VALUES (2, 2, 1, '2018-05-13', 2, 'Bonsai Enr', '');

-- acer rubrum
INSERT INTO tree_species (id, name) VALUES (3, 'Rubrum');
INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) VALUES (3, 2, 2, 3);
INSERT INTO tree (id, tree_type_id) VALUES (3, 3);
INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location,	comment) VALUES (3, 3, 5, '2018-05-20', 1, 'Kevin Backyard', '');

-- ficus burtt-davyi
INSERT INTO tree_family (id, name) VALUES (3, 'Moraceae');
INSERT INTO tree_genus (id, name) VALUES (3, 'Ficus');
INSERT INTO tree_species (id, name) VALUES (4, 'Burtt-Davyi');
INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) VALUES (4, 3, 3, 4);
INSERT INTO tree (id, tree_type_id) VALUES (4, 4);
INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location,	comment) VALUES (4, 4, 1, '2018-05-13', 2, 'Bonsai Enr', '');

-- ficus retusa
INSERT INTO tree_species (id, name) VALUES (5, 'Retusa');
INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) VALUES (5, 3, 3, 5);
INSERT INTO tree (id, tree_type_id) VALUES (5, 5);
INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location,	comment) VALUES (5, 5, 0, '2018-04-28', 3, 'Fleuriste St-Elie, Sherbrooke', '');

-- portulacaria
INSERT INTO tree_family (id, name) VALUES (4, 'Didiereaceae');
INSERT INTO tree_genus (id, name) VALUES (4, 'Portulacaria');
INSERT INTO tree_species (id, name) VALUES (6, 'Afra');
INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) VALUES (6, 4, 4, 6);
INSERT INTO tree (id, tree_type_id) VALUES (6, 6);
INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location,	comment) VALUES (6, 6, 0, '2018-05-21', 1, 'Fleuriste St-Elie, Sherbrooke', ''); 

-- rosemary
INSERT INTO tree_family (id, name) VALUES (5, 'Lamiaceae');
INSERT INTO tree_genus (id, name) VALUES (5, 'Rosmarinus');
INSERT INTO tree_species (id, name) VALUES (7, 'Officinalis');
INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) VALUES (7, 5, 5, 7);
INSERT INTO tree (id, tree_type_id) VALUES (7, 7);
INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location,	comment) VALUES (7, 7, 0, '2018-05-26', 3, 'Canadian Tire', '');

-- Schefflera arboricola
INSERT INTO tree_family (id, name) VALUES (6, 'Araliaceae'); 
INSERT INTO tree_genus (id, name) VALUES (6, 'Schefflera');
INSERT INTO tree_species (id, name) VALUES (8, 'Abricola');
INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) VALUES (8, 6, 6, 8);
INSERT INTO tree (id, tree_type_id) VALUES (8, 8);
INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location,	comment) VALUES (8, 8, 0, '2018-05-02', 3, 'Walmart', '');

---- Maintenance ----

INSERT INTO maintenance_type (id, name) VALUES (0, 'Repotting');
INSERT INTO maintenance_type (id, name) VALUES (1, 'Pruning');
INSERT INTO maintenance_type (id, name) VALUES (2, 'Fertilizing');
INSERT INTO maintenance_type (id, name) VALUES (3, 'Defoliate');
INSERT INTO maintenance_type (id, name) VALUES (4, 'Insect Treatment');


-- coprosma
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (0, 0, '2018-04-19', 'Light Root Pruning');
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (0, 2, '2018-06-01', 'Biogold');

-- crassula

-- acer palmatum
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (2, 2, '2018-06-01', 'biogold');

-- acer rubrum
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (3, 0, '2018-05-20', 'Garden Soil');

-- ficus burtt-davyi
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (4, 2, '2018-06-01', 'Biogold');

-- ficus retusa
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (5, 0, '2018-04-28', 'Root Pruning');
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (5, 2, '2018-06-01', 'Biogold');

-- portulacaria

-- rosemary
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (7, 0, '2018-05-26', 'Severe Root Pruning');

-- Schefflera arboricola
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (8, 0, '2018-05-02', 'Shallow Plastic Pot, Severe Root Pruning');
INSERT INTO maintenance (tree_id, maintenance_type_id, date, comment) VALUES (8, 2, '2018-06-01', 'Biogold');


-- Update primary key index

SELECT setval('acquisition_type_id_seq', (SELECT MAX(id) from "acquisition_type"));
SELECT setval('tree_family_id_seq', (SELECT MAX(id) from "tree_family"));
SELECT setval('tree_genus_id_seq', (SELECT MAX(id) from "tree_genus"));
SELECT setval('tree_species_id_seq', (SELECT MAX(id) from "tree_species"));
SELECT setval('tree_type_id_seq', (SELECT MAX(id) from "tree_type"));
SELECT setval('tree_id_seq', (SELECT MAX(id) from "tree"));
SELECT setval('acquisition_id_seq', (SELECT MAX(id) from "acquisition"));
SELECT setval('maintenance_type_id_seq', (SELECT MAX(id) from "maintenance_type"));
SELECT setval('maintenance_id_seq', (SELECT MAX(id) from "maintenance"));
-- SELECT setval('test_id_seq', (SELECT MAX(id) from "photo"));

COMMIT;


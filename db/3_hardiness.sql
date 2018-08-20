CREATE TABLE hardiness_zone (
	id VARCHAR(3) PRIMARY KEY,
	min_temp_low REAL NOT NULL,
	min_temp_high REAL NOT NULL
);

CREATE TABLE tree_type_hardiness (
	tree_type_id SERIAL REFERENCES tree_type(id),
    zone_preferred VARCHAR(3) REFERENCES hardiness_zone(id) NOT NULL,
	zone_min VARCHAR(3) REFERENCES hardiness_zone(id) NOT NULL,
	zone_max VARCHAR(3) REFERENCES hardiness_zone(id) NOT NULL,
	UNIQUE(tree_type_id)
);

INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('1a', -51.1, -48.3);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('1b', -48.3, -45.6);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('2a', -45.6, -42.8);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('2b', -42.8, -40.0);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('3a', -40.0, -37.2);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('3b', -37.2, -34.4);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('4a', -34.4, -31.7);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('4b', -31.7, -28.9);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('5a', -28.9, -26.1);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('5b', -26.1, -23.3);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('6a', -23.3, -20.6);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('6b', -20.6, -17.8);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('7a', -17.8, -15.0);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('7b', -15.0, -12.2);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('8a', -12.2, -9.4);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('8b', -9.4, -6.7);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('9a', -6.7, -3.9);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('9b', -3.9, -1.0);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('10a', -1.0, 1.7);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('10b', 1.7, 4.4);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('11a', 4.4, 7.2);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('11b', 7.2, 10.0);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('12a', 10.0, 12.8);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('12b', 12.8, 15.6);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('13a', 15.6, 18.3);
INSERT INTO hardiness_zone (id, min_temp_low, min_temp_high) VALUES ('13b', 18.3, 21.1);

INSERT INTO tree_type_hardiness (tree_type_id, zone_min, zone_max, zone_preferred) VALUES (0, '8b', '10a',  '9a'); -- coprosma
INSERT INTO tree_type_hardiness (tree_type_id, zone_min, zone_max, zone_preferred) VALUES (1, '9a', '11b', '10a'); -- crassula
INSERT INTO tree_type_hardiness (tree_type_id, zone_min, zone_max, zone_preferred) VALUES (2, '5a', '8b',   '6a'); -- palmatum
INSERT INTO tree_type_hardiness (tree_type_id, zone_min, zone_max, zone_preferred) VALUES (3, '3a', '9b',   '4a'); -- rubrum
INSERT INTO tree_type_hardiness (tree_type_id, zone_min, zone_max, zone_preferred) VALUES (4, '9a', '11b',  '9a'); -- burtt-davyi
INSERT INTO tree_type_hardiness (tree_type_id, zone_min, zone_max, zone_preferred) VALUES (5, '9b', '11b',  '9a'); -- retusa
INSERT INTO tree_type_hardiness (tree_type_id, zone_min, zone_max, zone_preferred) VALUES (6, '9a', '11b', '10a'); -- afra
INSERT INTO tree_type_hardiness (tree_type_id, zone_min, zone_max, zone_preferred) VALUES (7, '7a', '10b',  '8a'); -- romarin
INSERT INTO tree_type_hardiness (tree_type_id, zone_min, zone_max, zone_preferred) VALUES (8, '9a', '11b', '10a'); -- scheffl.

DROP VIEW IF EXISTS tree_view CASCADE;
CREATE VIEW tree_view AS
	SELECT
		tree.id AS id,
		tree_type.id AS tree_type_id,
        tree_type_hardiness.zone_preferred AS tree_type_zone,
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
	INNER JOIN tree_type_hardiness ON tree_type_hardiness.tree_type_id = tree_type.id
	INNER JOIN tree_family ON tree_type.tree_family_id = tree_family.id
	INNER JOIN tree_genus ON tree_type.tree_genus_id = tree_genus.id
	INNER JOIN tree_species ON tree_type.tree_species_id = tree_species.id;
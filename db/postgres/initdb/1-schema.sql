DROP TABLE IF EXISTS spy CASCADE;
CREATE TABLE spy
(
    id      SERIAL PRIMARY KEY,
    code    VARCHAR(3) UNIQUE NOT NULL,
    name    VARCHAR(255)      NOT NULL,
    retired BOOLEAN DEFAULT FALSE,
    alive   BOOLEAN DEFAULT TRUE
);

DROP TABLE IF EXISTS mission CASCADE;
CREATE TABLE mission
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    country     VARCHAR(255)
);

DROP TABLE IF EXISTS mission_assignment CASCADE;
CREATE TABLE mission_assignment
(
    spy_id     SERIAL,
    mission_id SERIAL,
    CONSTRAINT spy_fk FOREIGN KEY (spy_id) REFERENCES Spy (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT mission_fk FOREIGN KEY (mission_id) REFERENCES Mission (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS target CASCADE;
CREATE TABLE target
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    mission_id  SERIAL,
    CONSTRAINT target_fk FOREIGN KEY (mission_id) REFERENCES Mission (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

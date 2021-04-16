------------ CREATE Tables for CONTAINER CHALLENGE ------------

-------------- CREATE Spy --------------
CREATE TABLE Spy
(
    codeName VARCHAR(255),
    name VARCHAR(255),
    retired BOOLEAN,
    alive BOOLEAN,
    CONSTRAINT spy_pk PRIMARY KEY (codeName)
);

------------- CREATE Mission -------------
CREATE TABLE Mission(
    missionId INTEGER,
    name VARCHAR(255),
    description VARCHAR(255),
    country VARCHAR(255),
    CONSTRAINT mission_pk PRIMARY KEY (missionId)
);

----------- CREATE assignedMissions -----------
CREATE TABLE assignedMissions(
    codeName VARCHAR(255),
    missionId INTEGER,
    CONSTRAINT assigned_spy FOREIGN KEY (codeName)
    REFERENCES Spy(codeName),
    CONSTRAINT assigned_mission FOREIGN KEY (missionId)
    REFERENCES Mission(missionId)
);

-------------- CREATE Target --------------
CREATE TABLE Target(
    name VARCHAR(255),
    description VARCHAR(255),
    missionId INTEGER,
    CONSTRAINT target_pk PRIMARY KEY (name),
    CONSTRAINT target_fk FOREIGN KEY (missionId)
    REFERENCES Mission(missionId)
);
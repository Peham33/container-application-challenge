------------ INSERT INTO Tables for CONTAINER CHALLENGE ------------

-------------- INSERT INTO Spy --------------
INSERT INTO Spy VALUES
(
    '409','Austin Powers', false, true  
);

INSERT INTO Spy VALUES
(
    '007','James Bond', false, true  
);

INSERT INTO Spy VALUES
(
    '410','Johnny Englisch', true, false  
);

-------------- INSERT INTO Mission --------------
INSERT INTO Mission VALUES
(
    01, 'Operation Dijkstra', '409 Agent in conflict', 'Rotterdam'
);

INSERT INTO Mission VALUES
(
    02, 'Operation Freedom', 'Search for the ultimate solution', 'North Pole'
);

INSERT INTO Mission VALUES
(
    03, 'Deployment', 'Deployment without downtime', 'Linz'
);

INSERT INTO Mission VALUES
(
    04, 'Save communication', 'Setting up an encrypted communication channel', 'Vienna'
);

INSERT INTO Mission VALUES
(
    05, 'Container challenge', 'Start the challenge and try to get into the best company', 'Top secret'
);

-------------- INSERT INTO Target --------------

INSERT INTO Target VALUES
(
    'A*', 'Mission successful', 01
);

INSERT INTO Target VALUES
(
    'Bad boys', 'Mission successful', 02
);

INSERT INTO Target VALUES
(
    'Kubernetes', 'unfinished mission', 03
);

INSERT INTO Target VALUES
(
    'HAProxy', 'Mission successful', 04
);

INSERT INTO Target VALUES
(
    'Gepardec', 'unfinished mission', 05
);

-------------- INSERT INTO assignedMissions --------------
INSERT INTO assignedMissions VALUES
(
    '007', 03
);

INSERT INTO assignedMissions VALUES
(
    '007', 04
);

INSERT INTO assignedMissions VALUES
(
    '007', 05
);

INSERT INTO assignedMissions VALUES
(
    '409', 01
);

INSERT INTO assignedMissions VALUES
(
    '410', 02
);
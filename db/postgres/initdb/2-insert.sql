INSERT INTO spy(id, code, name)
VALUES (1, '69', 'Austin Powers'),
       (2, '007', 'James Bond'),
       (3, '003', 'Johnny English');

ALTER SEQUENCE spy_id_seq RESTART WITH 4;

INSERT INTO mission(id, name, description, country)
VALUES (1, 'Operation Dijkstra', '409 Agent in conflict', 'Rotterdam'),
       (2, 'Operation Freedom', 'Search for the ultimate solution', 'North Pole'),
       (3, 'Deployment', 'Deployment without downtime', 'Linz'),
       (4, 'Save communication', 'Setting up an encrypted communication channel', 'Vienna'),
       (5, 'Container challenge', 'Start the challenge and try to get into the best company', 'Top secret');

ALTER SEQUENCE mission_id_seq RESTART WITH 4;

INSERT INTO target(name, description, mission_id)
VALUES ('A*', 'Mission successful', 1),
       ('Bad boys', 'Mission successful', 2),
       ('Kubernetes', 'unfinished mission', 3),
       ('HAProxy', 'Mission successful', 4),
       ('Gepardec', 'unfinished mission', 5);

INSERT INTO mission_assignment
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 4),
       (3, 5);

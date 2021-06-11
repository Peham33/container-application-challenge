# Postgres-DB

Configurations and more for running the Postgres-DB container in our application challenge.

## Run the container 
You can run the haproxy container using the docker-compose.yml file provided.

```	
# Make sure that you are in the project root folder
docker-compose up database
```
## Connect to the DB

Start another shell and run the command below

```	
# Make sure that you are in the project root folder
docker-compose exec database psql --host=database --username=james --dbname=secret

# Select the data
SELECT * FROM Target JOIN Mission ON(mission_id = Mission.id)
JOIN mission_assignment USING(mission_id)
JOIN Spy ON(spy_id = Spy.id) WHERE code = '007';
```

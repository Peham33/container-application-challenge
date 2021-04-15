# container-application-challenge
SPR4G1 Studienprojekt für gepardec

## How to start REST API with HAProxy
1. Run `mvnq package` in ./app
2. Run `docker-compose up --build` in root directory
3. The application is now running under http://localhost:9999/
4. If the backend has not changed, running `docker-compose up` is enough

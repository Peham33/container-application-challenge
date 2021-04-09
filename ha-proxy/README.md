# HA-Proxy

Configurations and more for running the HAProxy container in our application challenge.

To test the container you need to have a backend (a http server) on your local machine running on port 1234. You can start a simple ftp server with Python.

```
# Start a test ftp server as backend for HAProxy
python3 -m http.server 1234
```

## Build and run your container

```
# Build your Docker image
docker build -t haproxy_test .

# Run a container with your image and expose port 999
docker run -p 9999:9999 --rm haproxy_test
```

HTTP request logs will be shown in stdout of the container.


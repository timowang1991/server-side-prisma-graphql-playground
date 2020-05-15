# What is this?
This is a standalone prisma graphql playground which connects to a remote graphql server.
![截圖 2020-05-13 下午4 47 51](https://user-images.githubusercontent.com/5511042/82015884-628d6480-96b2-11ea-8090-1ce8bb4d76cd.png)

# Quick start
```
docker-compose up
```

For developing (with nodemon)
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

then open the following url with your browser:
http://localhost:5466/playground

# Customize graphql server endpoints
Usually, there are 2 endpoints to change, one is the `graphql` endpoint and the other is the `introspect` endpoint.

You can edit the `environment` section in `docker-compose.yml` to adjust the endpoints (`TARGET_QUERY_URL` and `TARGET_INTROSPECT_URL`) of your graphql server.
```
environment:
    - PORT=5466
    - TARGET_QUERY_URL=http://${HOSTNAME}:4080/api/v1/gql/query
    - TARGET_INTROSPECT_URL=http://${HOSTNAME}:4080/api/v1/gql/introspect
```

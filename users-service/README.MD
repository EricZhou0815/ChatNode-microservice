# tpyescript node setup: yarn -D module-alias ts-node-dev typescript

# mysql orm setup" yarn add config mysql2 reflect-metadata typeorm

# ts setup: yarn add -D @types/config @types/node ts-node



# typeOrm

# use typeorm in this repo: 


# migrate: yarn typeorm migration:create -n <table_name>. Tables: users, userSessions

# in migration file, set table, index in up function, set drop table in down function

# do the db migration in the docker container

# $docker-compose exec users-service bash -> $yarn db:migrate


# express / cors

# $yarn add express cors, $yarn add -D @types/express @types/cors



# mysql query

# jump into db docker: $docker-compose exec users-service-db bash

# connect to db: $mysql -u -root -p db, $use db;, $show talbes;, $ALTER TABLE t1 CHANGE a b DATATYPE;, $INSERT INTO t1 (id, username, passwordHash) values ('id','Mike','234i8ujhgreghggertht4353ywe');

# local endpointL localhost:7101/uers/0ba2c5e0-51a9-11eb-80a2-0242ac130002

# $yarn add bcryptjs, $yarn add -D @types/bcryptjs, yarn add dayjs, lodash.omit


#users-service-db_1  | 2021-06-09T11:07:53.764995Z 20 [Note] Aborted connection 20 to db: 'db' user: 'root' host: '172.20.0.5' (Got an error reading communication packets)
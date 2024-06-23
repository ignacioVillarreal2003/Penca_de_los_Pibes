FROM mysql:latest

COPY init.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD=1234
ENV MYSQL_DATABASE=ObligatorioBD2

EXPOSE 3306

FROM postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB vittobank
# COPY vittobank.sql /docker-entrypoint-initdb.d/
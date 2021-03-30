## Create db on docker

docker run --name postgres -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

## Migracao de banco de dados com TypeORM

# criando arquivos de migracao

yarn typeorm migration:create -n CreateProducts

# executando mirgracao

yarn typeorm migration:run

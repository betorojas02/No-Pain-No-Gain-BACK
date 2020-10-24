# Descripción

proyecto realizado en node.js con el ORM  typeorm, para proteger las rutas se utilizo JWT.



# conexión base de datos sin Docker 

- necesita crear las siguientes credenciales 


| tipo  | dato |
| ------ | ------ |
| type | mysql |
| host | 172.16.100.9 |
| port  | 3306 |
| username |root |
| password | Admin.2020 |
| database  | gym |


# como utilizar rutas con la protección de jwt 

para el manejo de las rutas protegidas se nesecita enviar el los headers

Ejemplo 

- enviara el token mediante el nombre "auth"

### Documentación de las rutas 


con esta url puede ver toda la documentacion de las rutas que se utiliza para realizar este proyecto
https://documenter.getpostman.com/view/6832595/TVYDeeYG




### Docker

- dentro de la carpeta del proyecto de node
- tener instalado Docker y configurado correctamente 

```sh
docker-compose  build 
docker-compose up -d
```

- encontra un archvio llamado docker-compose donde encontrara  las credenciales de base de datos


### Datos admin

- el usuario principal para crear cuidades sedes y ver listado de usuario es:
- usuario o username : beto
- clave o password : 123456 

### los puertos 

para comunicarse con node.js y correr el proyecto es por el puerto 5000, pero internamente en docker es por le puerto 3000  

- localmente puerto :   3000
- Docker puerto :   5000





# Awesome Project Build with TypeORM




Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

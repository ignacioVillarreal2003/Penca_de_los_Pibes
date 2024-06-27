# Aplicación de penca

# Introducción
El siguiente proyecto trata sobre la realización de una aplicación para la penca de la Copa América 2024, aunque en nuestro caso decidimos expandirlo a la posibilidad de que esta sea utilizada para diversos eventos, incluso siendo estos simultáneos entre sí.

La aplicación cuenta con distintas pantallas, entre estas:
- La pantalla de inicio de sesión, en la cual los usuarios se pueden registrar o iniciar sesión (en caso de tener un usuario), ya sea admin o participante. Cada uno se presenta con su respectivo menu consiguiente.
- De ingresar como administrador, se presentan funcionalidades tanto para crear o modificar campeonatos como para manipular la información de los partidos dentro de un campeonato, ya sea agregar, eliminar o modificar sus atributos.
- De ser participante, se lo redirige a la página principal en la cual este será capaz de hacer sus apuestas sobre los partidos del campeonato seleccionado. También se le presentan algunas funcionalidades extra tales como cambiar la estética de su página principal (modo claro o oscuro), cambiar su avatar o sus datos personales, entre otros. Además, cada participante tiene acceso a la tabla de rankings, donde se muestra en que puesto se ubica teniendo en cuenta los puntos obtenidos por cada predicción sobre los diferentes partidos.
  
# Requerimientos
- Se requiere tener instalado tanto Angular como NodeJS.

# Base de datos
Para levantar la base de datos se debe navegar a la carpeta Docker en la consola e ingresar:
```
docker-compose up --build
```
Luego de que el contenedor quede corriendo, ingresar en DataGrip y crear un nuevo DataSource con MySql e ingresar los datos para la conexión. El usuario es root, la contraseña es 1234 y el puerto es 3306.

# Funcionalides
## Angular
Posicionarse en la carpeta /PencaUCUCode en la terminal y escribir el comando:
```
npm install
```
seguido del comando:
```
ng serve --open
```
Con esto quedará abierto en localhost:4200 la aplicación.

## Server 
Posicionarse en la carpeta /servidor en una nueva terminal y escribir el comando:
```
npm install
```
seguido del comando:
```
npm run dev
```
Haciendo esto el servidor ya quedará funcionando correctamente.

# Aclaraciones
Si se quisiera acceder a las funcionalidades del administrador será necesario iniciar sesión con las siguientes credenciales:
```
Usuario: 11111111
Contraseña: 12345678
```
Y a continuación presionar el botón con el texto "ingresar como administrador".

## Crear un archivo en el servidor con el nombre .env en el caso de que no se encuentre y escribir:
```
PORT="3306"
USER="root"
PASS="1234"
NAME="ObligatorioBD2"
SECRET="shhhh"
MAIL="PabloPicasoPicaPiedras" 
MAILPASS="owuv qahd rapw zkao"
```

# Integrantes
- Emiliano Fau
- Floriana Locatelli
- Ignacio Villareal

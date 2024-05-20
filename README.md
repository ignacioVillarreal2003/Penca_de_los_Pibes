# Aplicación de penca

# Introducción
El siguiente proyecto trata sobre la realización de una aplicación para la penca de la Copa América 2024, aunque en nuestro caso decidimos expandirlo a la posibilidad de que esta sea utilizada para diversos eventos, incluso siendo estos simultáneos entre sí.

La aplicación cuenta con distintas pantallas, entre estas:
- La pantalla de inicio de sesión, en la cual los usuarios se pueden registrar o iniciar sesión (en caso de tener un usuario), ya sea admin o participante. Cada uno se presenta con su respectivo menu consiguiente.
- De ingresar como administrador, se presentan funcionalidades tanto para crear o modificar campeonatos como para manipular la información de los partidos dentro de un campeonato, ya sea agregar, eliminar o modificar sus atributos.
- De ser participante, se lo redirige a la página principal en la cual este será capaz de hacer sus apuestas sobre los partidos del campeonato seleccionado. También se le presentan algunas funcionalidades extra tales como cabiar la estética de su página principal (modo claro o oscuro), cambiar su avatar o sus datos personales, entre otros. Además, cada participante tiene acceso a la tabla de rankings, donde se muestra en que puesto se ubica teniendo en cuenta los puntos obtenidos por cada predicción sobre los diferentes partidos.
  
# Requerimientos
- Se requiere tener instalado tanto Angular como NodeJS.

# Base de datos
Crear una base de datos haciendo uso de docker en el puerto 3306, y utilizando como credenciales:
```
Usuario: root
Contraseña: 1234
```
O puede levantar el docker-compose.yml en la terminal con el comando docker-compose up.

Poner los datos necesarios en datagrip para lograr una conexión, y sobre esta crear una base de datos llamada Obligatorio.
Los datos necesarios para la base de datos son los expuestos a continuación:

```
CREATE DATABASE Obligatorio;
USE Obligatorio;

CREATE TABLE Usuarios(
    Usuario VARCHAR(60) PRIMARY KEY CHECK (CHAR_LENGTH(Usuario) >= 8),
    Contraseña VARCHAR(60) CHECK (CHAR_LENGTH(Contraseña) >= 8)
);

CREATE TABLE Admin(
    Usuario VARCHAR(60) PRIMARY KEY CHECK (CHAR_LENGTH(Usuario) >= 8),
    Contraseña VARCHAR(60) CHECK (CHAR_LENGTH(Contraseña) >= 8)
);

CREATE TABLE Funcionarios(
    Ci VARCHAR(8) PRIMARY KEY CHECK (CHAR_LENGTH(Ci) = 8),
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Fecha_Nacimiento DATE NOT NULL,
    Direccion VARCHAR(50) NOT NULL,
    Telefono VARCHAR(50) NOT NULL CHECK (CHAR_LENGTH(Telefono) = 9),
    Email VARCHAR(50) NOT NULL CHECK (Email LIKE '%@%'),
    Usuario VARCHAR(60) NOT NULL CHECK (CHAR_LENGTH(Usuario) >= 8),
    FOREIGN KEY (Usuario) REFERENCES Usuarios(Usuario)
);

CREATE TABLE Agenda(
    Numero_Agenda INT AUTO_INCREMENT PRIMARY KEY,
    Ci VARCHAR(8) CHECK (CHAR_LENGTH(Ci) = 8),
    Fecha_Agenda DATE NOT NULL,
    FOREIGN KEY (Ci) REFERENCES Funcionarios(Ci)
);

CREATE TABLE Carnet_Salud(
    Ci VARCHAR(8) NOT NULL PRIMARY KEY CHECK (CHAR_LENGTH(Ci) = 8),
    Fecha_Emision DATE NOT NULL,
    Fecha_Vencimiento DATE NOT NULL,
    Comprobante BLOB NOT NULL,
    FOREIGN KEY (Ci) REFERENCES Funcionarios(Ci)
);

CREATE TABLE Periodos_Actualizacion(
    Año VARCHAR(4) NOT NULL PRIMARY KEY,
    Fecha_Inicio DATE NOT NULL,
    Fecha_Fin DATE NOT NULL
);


CREATE TABLE Periodo_Agenda(
    Año VARCHAR(4) NOT NULL PRIMARY KEY,
    Fecha_Inicio DATE NOT NULL,
    Fecha_Fin DATE NOT NULL
);

INSERT INTO Admin(Usuario, Contraseña)
VALUE ('admin123','admin123');

INSERT INTO Periodos_Actualizacion(Año, Fecha_Inicio, Fecha_Fin) VALUE ('2023','2023-11-01','2023-11-15');
INSERT INTO Periodo_Agenda(Año, Fecha_Inicio, Fecha_Fin) VALUE ('2023','2023-11-01','2023-12-31');
```

# Funcionalides
## Angular
Posicionarse en la carpeta /app en la terminal y escribir el comando:
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
Usuario: admin123
Contraseña: admin123
```
Y a continuación presionar el botón con el texto "ingresar como administrador".

## Crear un archivo en el servidor con el nombre .env y escribir:
>- MAIL="El email desde donde se van a mandar mensajes"
>- PASS="Contraseña de aplicacion(al verificar en dos pasos, en el gmail de origen)"

# Integrantes
- Emiliano Fau
- Ignacio Villareal
- Floriana Locatelli

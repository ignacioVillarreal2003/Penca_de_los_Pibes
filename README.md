# Penca_de_los_Pibes

# No le den bola a lo q dice el readme, es solo para tenerlo ahí

# Introducción
### El proyecto cuenta con 4 pantallas
- La pantalla de inicio de sesión, en la cual los usuarios pueden registrar o iniciar sesión (de tener un usuario), ya sea admin o funcionario.
- De ingresar como admin, se presentan funcionalidades para modificar las fechas de consulta y de formulario.
- De ser funcionario, se lo redirige a un formulario para rellenar sus datos y, de no tener carné de salud o este estar vencido,
se le permite solicitarlo (reservando una fecha para la consulta). Si se presenta con un carné de salud vigente a la fecha, se le pide al usuario subir el comprobante del mismo.
- En el caso de ser un funcionario nuevo va a ser necesario que se registre, siendo este formulario más extenso que el anteriormente mencionado.

  
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

drop database ObligatorioBD2;
CREATE DATABASE ObligatorioBD2;
USE ObligatorioBD2;
CREATE TABLE Usuario(
    ci VARCHAR(8) PRIMARY KEY,
    password VARCHAR(20)
);
CREATE TABLE Administrador(
    ci VARCHAR(8) PRIMARY KEY,
    FOREIGN KEY (ci) REFERENCES Usuario(ci)
);
CREATE TABLE Participante(
    ci VARCHAR(8) PRIMARY KEY,
    score INT,
    username VARCHAR(20),
    mail VARCHAR(40),
    FOREIGN KEY (ci) REFERENCES Usuario(ci)
);
CREATE TABLE Carrera(
    career VARCHAR(50) PRIMARY KEY
);
CREATE TABLE Equipo(
    teamName VARCHAR(20) PRIMARY KEY
);
CREATE TABLE Campeonato(
    championshipName VARCHAR(50) PRIMARY KEY,
    startDate DATETIME,
    endDate DATETIME
);
CREATE TABLE Pertenecen(
    ci VARCHAR(8) PRIMARY KEY,
    career VARCHAR(50),
    FOREIGN KEY (ci) REFERENCES Participante(ci),
    FOREIGN KEY (career) REFERENCES Carrera(career)
);
CREATE TABLE Participan(
    championshipName VARCHAR(50),
    teamName VARCHAR(20),
    teamGroup VARCHAR(1),
    PRIMARY KEY (championshipName, teamName)
);
CREATE TABLE Juegan_partido(
    dateMatch DATETIME,
    team1 VARCHAR(20),
    team2 VARCHAR(20),
    championshipName1 VARCHAR(50),
    championshipName2 VARCHAR(50),
    location VARCHAR(50),
    scoreTeam1 INT,
    scoreTeam2 INT,
    stage VARCHAR(20),
    PRIMARY KEY (dateMatch, team1, team2, championshipName1, championshipName2),
    FOREIGN KEY (team1) REFERENCES Equipo(teamName),
    FOREIGN KEY (team2) REFERENCES Equipo(teamName),
    FOREIGN KEY (championshipName1) REFERENCES Campeonato(championshipName),
    FOREIGN KEY (championshipName2) REFERENCES Campeonato(championshipName),
    CHECK(championshipName1 = championshipName2)
);
CREATE TABLE Predicen(
    ci VARCHAR(8),
    dateMatch DATETIME,
    team1 VARCHAR(20),
    team2 VARCHAR(20),
    championshipName1 VARCHAR(50),
    championshipName2 VARCHAR(50),
    datePrediction DATETIME,
    scoreTeam1 INT,
    scoreTeam2 INT,
    PRIMARY KEY (ci, dateMatch, team1, team2, championshipName1, championshipName2),
    FOREIGN KEY (ci) REFERENCES Participante(ci),
    FOREIGN KEY (dateMatch) REFERENCES Juegan_partido(dateMatch),
    FOREIGN KEY (team1) REFERENCES Equipo(teamName),
    FOREIGN KEY (team2) REFERENCES Equipo(teamName),
    FOREIGN KEY (championshipName1) REFERENCES Campeonato(championshipName),
    FOREIGN KEY (championshipName2) REFERENCES Campeonato(championshipName),
    CHECK(championshipName1 = championshipName2)
);
CREATE INDEX idx_participan_campeonato ON Participan(championshipName);
CREATE INDEX idx_participan_equipo ON Participan(teamName);
CREATE TABLE Pronostico_inicial(
    ci VARCHAR(8),
    championshipName VARCHAR(50),
    champion VARCHAR(20),
    subChampion VARCHAR(20),
    PRIMARY KEY (ci, championshipName),
    FOREIGN KEY (ci) REFERENCES Participante(ci),
    FOREIGN KEY (championshipName) REFERENCES Campeonato(championshipName),
    FOREIGN KEY(champion) REFERENCES Participan(teamName),
    FOREIGN KEY (subChampion) REFERENCES Participan(teamName)
);

INSERT INTO Usuario (ci, password) VALUES
('11111111', '12345678'),
('22222222', '12345678'),
('33333333', '12345678'),
('44444444', '12345678'),
('55555555', '12345678');

INSERT INTO Administrador (ci) VALUES
('11111111');

INSERT INTO Participante (ci, score, username, mail) VALUES
('22222222', 30, 'Carlos', null),
('33333333', 40, 'David', null),
('44444444', 50, 'Eva', null),
('55555555', 60, 'Francisco', 'ignavillarreal31@gmail.com');

INSERT INTO Carrera (career) VALUES
('Ingeniería'),
('Medicina'),
('Psicología'),
('Negocios Internacionales');

INSERT INTO Pertenecen (ci, career) VALUES
('22222222', 'Psicología'),
('33333333', 'Negocios Internacionales'),
('44444444', 'Ingeniería'),
('55555555', 'Medicina');

INSERT INTO Equipo (teamName) VALUES
('Argentina'),
('Canada'),
('Peru'),
('Chile'),
('Ecuador'),
('Venezuela'),
('Mexico'),
('Jamaica'),
('USA'),
('Bolivia'),
('Uruguay'),
('Panama'),
('Colombia'),
('Paraguay'),
('Brasil'),
('Costa Rica');

INSERT INTO Campeonato (championshipName, startDate, endDate) VALUES
('Copa América 2024', '2024-06-23 19:57:00', '2024-07-14 19:57:00');

INSERT INTO Participan (championshipName, teamName, teamGroup) VALUES
('Copa América 2024', 'Argentina', 'A'),
('Copa América 2024', 'Canada', 'A'),
('Copa América 2024', 'Peru', 'A'),
('Copa América 2024', 'Chile', 'A'),
('Copa América 2024', 'Ecuador', 'B'),
('Copa América 2024', 'Venezuela', 'B'),
('Copa América 2024', 'Mexico', 'B'),
('Copa América 2024', 'Jamaica', 'B'),
('Copa América 2024', 'USA', 'C'),
('Copa América 2024', 'Bolivia', 'C'),
('Copa América 2024', 'Uruguay', 'C'),
('Copa América 2024', 'Panama', 'C'),
('Copa América 2024', 'Colombia', 'D'),
('Copa América 2024', 'Paraguay', 'D'),
('Copa América 2024', 'Brasil', 'D'),
('Copa América 2024', 'Costa Rica', 'D');

INSERT INTO Juegan_partido (dateMatch, team1, team2, championshipName1, championshipName2, location, scoreTeam1, scoreTeam2, stage) VALUES
('2024-06-23 19:47:00', 'Argentina', 'Canada', 'Copa América 2024', 'Copa América 2024', 'Estadio A', 0, 0, 'Grupos'),
('2024-06-20 20:37:00', 'Peru', 'Chile', 'Copa América 2024', 'Copa América 2024', 'Estadio B', 0, 0, 'Grupos'),
('2024-06-22 21:27:00', 'Peru', 'Canada', 'Copa América 2024', 'Copa América 2024', 'Estadio C', 0, 0, 'Grupos'),
('2024-06-22 19:57:00', 'Argentina', 'Chile', 'Copa América 2024', 'Copa América 2024', 'Estadio D', 0, 0, 'Grupos'),
('2024-06-24 19:57:00', 'Argentina', 'Peru', 'Copa América 2024', 'Copa América 2024', 'Estadio E', 0, 0, 'Grupos'),
('2024-06-24 19:57:00', 'Canada', 'Chile', 'Copa América 2024', 'Copa América 2024', 'Estadio F', 0, 0, 'Grupos'),
('2024-06-20 19:57:00', 'Ecuador', 'Venezuela', 'Copa América 2024', 'Copa América 2024', 'Estadio A', 0, 0, 'Grupos'),
('2024-06-20 19:57:00', 'Mexico', 'Jamaica', 'Copa América 2024', 'Copa América 2024', 'Estadio B', 0, 0, 'Grupos'),
('2024-06-22 19:57:00', 'Ecuador', 'Jamaica', 'Copa América 2024', 'Copa América 2024', 'Estadio C', 0, 0, 'Grupos'),
('2024-06-22 19:57:00', 'Venezuela', 'Chile', 'Copa América 2024', 'Copa América 2024', 'Estadio D', 0, 0, 'Grupos'),
('2024-06-24 19:57:00', 'Ecuador', 'Mexico', 'Copa América 2024', 'Copa América 2024', 'Estadio E', 0, 0, 'Grupos'),
('2024-06-24 19:57:00', 'Venezuela', 'Jamaica', 'Copa América 2024', 'Copa América 2024', 'Estadio F', 0, 0, 'Grupos'),
('2024-06-20 19:57:00', 'USA', 'Bolivia', 'Copa América 2024', 'Copa América 2024', 'Estadio A', 0, 0, 'Grupos'),
('2024-06-20 19:57:00', 'Panama', 'Uruguay', 'Copa América 2024', 'Copa América 2024', 'Estadio B', 0, 0, 'Grupos'),
('2024-06-22 19:57:00', 'Panama', 'USA', 'Copa América 2024', 'Copa América 2024', 'Estadio C', 0, 0, 'Grupos'),
('2024-06-22 19:57:00', 'Bolivia', 'Uruguay', 'Copa América 2024', 'Copa América 2024', 'Estadio D', 0, 0, 'Grupos'),
('2024-06-24 19:57:00', 'USA', 'Uruguay', 'Copa América 2024', 'Copa América 2024', 'Estadio E', 0, 0, 'Grupos'),
('2024-06-24 19:57:00', 'Bolivia', 'Panama', 'Copa América 2024', 'Copa América 2024', 'Estadio F', 0, 0, 'Grupos'),
('2024-06-20 19:57:00', 'Colombia', 'Paraguay', 'Copa América 2024', 'Copa América 2024', 'Estadio A', 0, 0, 'Grupos'),
('2024-06-20 19:57:00', 'Brasil', 'Costa Rica', 'Copa América 2024', 'Copa América 2024', 'Estadio B', 0, 0, 'Grupos'),
('2024-06-22 19:57:00', 'Colombia', 'Costa Rica', 'Copa América 2024', 'Copa América 2024', 'Estadio C', 0, 0, 'Grupos'),
('2024-06-22 19:57:00', 'Paraguay', 'Brasil', 'Copa América 2024', 'Copa América 2024', 'Estadio D', 0, 0, 'Grupos'),
('2024-06-24 19:57:00', 'Colombia', 'Brasil', 'Copa América 2024', 'Copa América 2024', 'Estadio E', 0, 0, 'Grupos'),
('2024-06-24 19:57:00', 'Paraguay', 'Costa Rica', 'Copa América 2024', 'Copa América 2024', 'Estadio F', 0, 0, 'Grupos');

USE BDHotelReservation
go
---------------------------------------------
----TABLES
CREATE TABLE Users(
	IDCard varchar(20) NOT NULL PRIMARY KEY ,
	NamesUser varchar(20) NOT NULL,
	LastName varchar(20) NOT NULL,
	Addresss varchar(20) NOT NULL,
	PhoneNumber varchar(20) NOT NULL,
	TypeUser varchar(20) NOT NULL,
	Hashh varchar(1000) not null,
	Statee varchar(20) not null,
	PasswordUser varchar(1000) not null,
	Mail varchar(50) NOT NULL,
)
go
CREATE TABLE Passenger(
	IDCard varchar(20) NOT NULL PRIMARY KEY ,
	Names varchar(20) NOT NULL,
	LastName varchar(20) NOT NULL,
	Country varchar(20) NOT NULL,
	Town varchar(20) NOT NULL,
	Addresss varchar(20) NOT NULL,
	PhoneNumber varchar(20) NOT NULL,
    Mail varchar(50) NOT NULL,
	Salt varchar(1000) not null,
	Passwordd varchar(1000) not null,
	Statee varchar(20) not null,
)
go
CREATE TABLE Room(
	NumberRoomm int NOT NULL PRIMARY KEY Identity(1,1) ,
	Typee varchar(20) NOT NULL,
	Typebed varchar(20) NOT NULL,
	Accommodation varchar(20) NOT NULL,
	Descriptionn varchar(1000) NOT NULL,
	Value money NOT NULL,
	Statee varchar(20) NOT NULL,
	Imagee varchar(100) NOT NULL,
)
go
CREATE TABLE Reservation(
	NumberReservationn int NOT NULL PRIMARY KEY,
	ReservationDate date NOT NULL,
	ArrivalDate date NOT NULL,
	DepartureDate  date NOT NULL,
	ProcessStatus varchar(20) NOT NULL,
	ConfirmationStatus varchar(20) NOT NULL,
	Origin varchar(20) NOT NULL,
    Total money NOT NULL,
	IDCardPassengerr varchar(20) not null Foreign Key References Passenger(IDCard),
)
go
CREATE TABLE ReservationDetail(
	NumberRD int NOT NULL,
	Value money NOT NULL,
	NumberReservation int not null Foreign Key References Reservation(NumberReservationn),
	NumberRoom int not null Foreign Key References Room(NumberRoomm),
	primary key(NumberRD,NumberReservation)

)
go
CREATE TABLE Servicee(
	IDService int NOT NULL PRIMARY KEY Identity(1,1)  ,
	NameS varchar(20) NOT NULL,
	Value money not null,
	Statee varchar(20) NOT NULL,
)
go
CREATE TABLE PassengerServicee(
	NumberPS int NOT NULL PRIMARY KEY,
	IDCardP varchar(20) not null Foreign Key References Passenger(IDCard),
	StartDate date not null,
	EndDate date not null,
	Total money not null,
	Observations varchar(1000) not null,
)
go
CREATE TABLE DetailPassengerService(
	IDDPassangerService int NOT NULL,
	NumberPService int not null Foreign Key References PassengerServicee(NumberPS),
    IDServicee int not null Foreign Key References Servicee(IDService),
	Amount money not null,
	primary key(IDDPassangerService,NumberPService)

)
go
CREATE TABLE Payment(
	IDPaymentt int NOT NULL PRIMARY KEY Identity(1,1),
    NumberReservation int not null Foreign Key References Reservation(NumberReservationn),
	IDCardPa varchar(20) not null Foreign Key References Passenger(IDCard),
	IDPassangerServicee int not null Foreign Key References PassengerServicee(NumberPS),
	PassengerAmount money not null,
	TotalRS money not null,
	Datee date not null,
)
go


--drop table Payment
--drop table DetailPassengerService
--drop table PassengerServicee
--drop table ReservationDetail
--drop table Reservation
--drop table Servicee
--drop table Room
--drop table Passenger
--drop table Users


select * from Users
select * from Servicee
select * from Passenger where town like'%a%'
select * from Room
--select * from Payment
select * from Reservation
select * from ReservationDetail
--select * from DetailPassengerService where IDServicee=1
select * from PassengerServicee
select * from DetailPassengerService

select * from Users where idcard='1111111111'
select * from Passenger where idcard='1111111111'
select * from Users where statee='Inactive' 

select * from Users where idcard like '%1%' and typeuser like '%Admin%' and phonenumber like '%1%' and addresss like '%a%' and mail like '%m%'

SELECT *
FROM   users
WHERE  idcard LIKE '%1%'
       AND typeuser LIKE '%a%'
       AND phonenumber LIKE '%4%'
       AND addresss LIKE '%a%'
       AND mail LIKE '%1%'
	   AND statee='Active' 

	   select * from Passenger
	   select * from room where numberroomm = 1
	   
	   SELECT *
		FROM   room
		WHERE  numberroomm between 0 and 1
       AND typee LIKE '%d%'
       AND typebed LIKE '%%'
		and value between 10 and 100
	   AND statee='Active'  

	    select count(*), typebed from room group by typebed 
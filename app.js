

// const { DataPassenger } = require("./data/DataPassenger");
// const { DataPassengerService } = require("./data/DataPassengerService");
// const { DataPayment } = require("./data/DataPayment");
// const { DataReservation } = require("./data/DataReservation");
// const { DataRoom } = require("./data/DataRoom");
// const { DataService } = require("./data/DataService");
// const { DataUser } = require("./data/DataUser");
// const { DTOPassenger } = require("./DTO/DTOPassenger");
// const { DTOReservation } = require("./DTO/DTOReservation");
// const { DTORoom } = require("./DTO/DTORoom");
// const { DTOUser } = require("./DTO/DTOUser");
// const { HashPassword } = require("./Hash_Login/hashPassword");
// const { LoginPassenger } = require("./Hash_Login/LoginPassenger");
// const { LoginUser } = require("./Hash_Login/LoginUser");
// const { Reservation } = require("./Reservation/reservation");
// const { Services } = require("./Services/services");

// //#region Passenger
// let passengermaintenance=async()=>
// {

//     async function registerPassenger() {
//         for (let index = 1; index < 100; index++) {
//             let dtopassenger =new DTOPassenger();
//             dtopassenger.idcard = "11111111111111" + index.toString();
//             dtopassenger.name = "NamePassenger" + index.toString();
//             dtopassenger.surname = "SurnamePassenger" + index.toString();
//             dtopassenger.country = "Country" + index.toString();
//             dtopassenger.password = "Password" + index.toString();
//             dtopassenger.town = "Town" + index.toString();
//             dtopassenger.address = "Address" + index.toString();
//             dtopassenger.phone = "111111111" + index.toString();
//             dtopassenger.maill ="email" + index.toString() + "@gmail.com";
//             const passh = HashPassword.hashPassword(dtopassenger.password);
//             dtopassenger.password = passh.hash;
//             dtopassenger.salt = passh.salt;
//             let registerPassenger = await DataPassenger.registerPassenger(dtopassenger);
//             if (registerPassenger===-1) {
//                 throw new Error("The passenger already exists");
//             }
//             console.log("The passenger registered successfully");
//         }
//     }
//      await registerPassenger();

    
//     async function updatePassenger() {
//         let dtopassenger = new DTOPassenger();
//         dtopassenger.idcard = "111111111111111"; 
//          dtopassenger.name = "NamePassengerUpdate" ;
//          dtopassenger.surname = "SurnamePassgerUpdate"; 
//          dtopassenger.country = "CountryUpdate"; 
//         dtopassenger.town = "TownUpdate";
//         dtopassenger.address = "AddressUpdate";
//         dtopassenger.phone = "11111111125";
//          dtopassenger.maill ="emailupdate@gmail.com";
//         let updatePassenger = await DataPassenger.updatePassenger(dtopassenger);
//          if (updatePassenger===-1) {
//                 throw new Error("The passenger does not exists");
//         }
//         console.log("The passenger updated successfully");
//     }
//     await updatePassenger();

// async function updateUserNamePassword() {
      
//         const passh = HashPassword.hashPassword("Password2");
//         let hashpassword = passh.hash;
//         let salt = passh.salt;
    
//             let updateusernamepassword = await DataPassenger.updatePasswordPassenger("1111111111111112",hashpassword, salt);
//             if (updateusernamepassword===-1) {
//                 throw new Error("The passenger does not exists");
//             }
//             console.log("The password was updated successfully");

//         }
//       await updateUserNamePassword();


//     async function inactivePassenger() {
    
//             let inactivePassenger = await DataPassenger.inactivePassenger("111111111111111");
//             if (inactivePassenger===-1) {
//                 throw new Error("The passenger does not exists");
//             }
//             console.log("The passenger was deleted successfully");

//         }
//       await inactivePassenger();

    
//         let loginPassenger = await LoginPassenger.loginPassenger('1111111111111112', 'Password2');
//         console.log(loginPassenger);


//         let getPassengerLogin = await LoginPassenger.getPassengerLogin();
//         console.log(getPassengerLogin);

//         let logout = await LoginPassenger.logoutPassenger();
//         console.log(logout);
    
//     let getPassenger = await DataPassenger.getPassenger("1111111111111112");
//     console.log(getPassenger);

//       let getPassengers = await DataPassenger.getPassengers("lastname");
//     console.log(getPassengers);

//        let getSearchPassengers = await DataPassenger.getSearchPassengers("","",
//        "","","","","","country");
//     console.log(getSearchPassengers);



//  }
// passengermaintenance().then()

// //#endregion
// //#region User
// let usermaintenace=async()=>
// {

// async function registerUser() {
//         for (let index = 1; index < 100; index++) {
//             let dtouser =new DTOUser();
//             dtouser.IDCard = "11111111111111" + index.toString();
//             dtouser.NamesUser = "NameUser" + index.toString();
//             dtouser.LastName = "SurnameUser" + index.toString();
//             dtouser.PasswordUser = "Password" + index.toString();
//             dtouser.Addresss = "Address" + index.toString();
//             dtouser.PhoneNumber = "11111111" + index.toString();
//             dtouser.TypeUser = "Town" + index.toString();
//             dtouser.Mail ="email" + index.toString() + "@gmail.com";
//             const passh = HashPassword.hashPassword(dtouser.PasswordUser);
//             dtouser.PasswordUser = passh.hash;
//             dtouser.Hashh = passh.salt;
//             let registerUser = await DataUser.registerUser(dtouser);
//             if (registerUser===-1) {
//                 throw new Error("The user already exists");
//             }
//             console.log("The user registered successfully");
//         }
//     }
//      await registerUser();


//     async function updateUser() {
//             let dtouser = new DTOUser();
//             dtouser.IDCard = "111111111111111"; 
//             dtouser.NamesUser = "NameUserupd" ;
//             dtouser.LastName = "SurnameUserupd";
//             dtouser.Addresss = "Addressupdate" ;
//             dtouser.PhoneNumber = "111111112";
//             dtouser.TypeUser = "Townupdate" ;
//             dtouser.Mail ="emailupddate@gmail.com";
//             let updateUser = await DataUser.updateUser(dtouser);
//             if (updateUser===-1) {
//                     throw new Error("The user does not exists");
//             }
//         console.log("The user updated successfully");
//     }
//     await updateUser();

// async function updatePasswordUser() {
      
//         const passh = HashPassword.hashPassword("Password2");
//         let hashpassword = passh.hash;
//         let salt = passh.salt;
    
//             let updatePasswordUser = await DataUser.updatePasswordUser("111111111111111",hashpassword, salt);
//             if (updatePasswordUser===-1) {
//                 throw new Error("The user does not exists");
//             }
//             console.log("The password was updated successfully");

//         }
//       await updatePasswordUser();


//     async function inactiveUser() {
    
//             let inactiveUser = await DataUser.inactiveUser("111111111111119");
//             if (inactiveUser===-1) {
//                 throw new Error("The user does not exists");
//             }
//             console.log("The user was deleted successfully");

//         }
//       await inactiveUser();

    
//         let loginUser = await LoginUser.loginUser('111111111111111', 'Password2');
//         console.log(loginUser);


//         let getUserLogin = await LoginUser.getUserLogin();
//         console.log(getUserLogin);

//         let logoutUser = await LoginUser.logoutUser();
//         console.log(logoutUser);
    
//     let getUser = await DataUser.getUser("1111111111111112");
//     console.log(getUser);

//       let getUsers = await DataUser.getUsers("Mail");
//     console.log(getUsers);

//        let getSearchUsers = await DataUser.getSearchUsers("","",
//        "","","","","mail");
//     console.log(getSearchUsers);

// }
// usermaintenace().then()
// //#endregion
// //#region Room

// let roommaintenance=async()=>
// {

// async function registerRoom() {
//         for (let index = 1; index < 100; index++) {
//             let dtoroom =new DTORoom();
//             dtoroom.Typee = "Typee" + index.toString();
//             dtoroom.Typebed = "Typebed" + index.toString();
//             dtoroom.Accommodation = "Accommodation" + index.toString();
//             dtoroom.Descriptionn = "Descriptionn" + index.toString();
//             dtoroom.Value = 99 + index;
//             dtoroom.Imagee ="urlimage" + index.toString();
//             dtoroom.Squaremeter = 42;
//             let registerRoom = await DataRoom.registerRoom(dtoroom);
//             console.log("The room registered successfully");
//         }
//     }
//      await registerRoom();


//     async function updateRoom() {
//             let dtoroom = new DTORoom();
//             dtoroom.NumberRoomm = 60;
//             dtoroom.Typee = "TypeeUpdate" 
//             dtoroom.Typebed = "Typebedupdate"
//              dtoroom.Accommodation = "AccommodationUp"
//               dtoroom.Descriptionn = "DescriptionnUP"
//             dtoroom.Value = 99 ;
//              dtoroom.Imagee ="urlimageup" 
//              dtoroom.Squaremeter = 38;
//             let updateRoom = await DataRoom.updateRoom(dtoroom);
//             if (updateRoom===-1) {
//              throw new Error("The room does not exists");
//             }
//         console.log("The room updated successfully");
//     }
//     await updateRoom();

//     async function inactiveRoom() {
    
//             let inactiveRoom = await DataRoom.inactiveRoom(5);
//             if (inactiveRoom===-1) {
//                 throw new Error("The room does not exists");
//             }
//             console.log("The room was deleted successfully");

//         }
//      await inactiveRoom();

    
//     let getRoom = await DataRoom.getRoom(1);
//     console.log(getRoom);

//       let getRooms = await DataRoom.getRooms("Value");
//     console.log(getRooms);

//        let getSearchRoom = await DataRoom.getSearchRoom("","",
//        "",145,150,39,45,"value");
//     console.log(getSearchRoom);

//      let getRoomsMultipleNumbers = await DataRoom.getRoomsMultipleNumbers([2,5,6,8,9]);
//     console.log(getRoomsMultipleNumbers);

// }
// roommaintenance().then()

// //#endregion
// //#region  Reservation

// let reservationmaintenance=async()=>
// {

//     //#region  Hotel Reservation


//             //Get passenger
//              let getPassenger = await DataPassenger.getPassenger("58656455446");
//              if (getPassenger===-1) {
//                 throw new Error("The Passenger does not exists")
//              }
//              console.log(getPassenger);

//          //   If the passenger does not exist
            
            
//             async function registerPassenger() {

//                 let dtopassenger = new DTOPassenger();
//                 dtopassenger.idcard = "58656455446";
//                 dtopassenger.name = "NamePassenger";
//                 dtopassenger.surname = "SurnamePassenger";
//                 dtopassenger.country = "Country";
//                 dtopassenger.password = "Password";
//                 dtopassenger.town = "Town";
//                 dtopassenger.address = "Address";
//                 dtopassenger.phone = "111111111";
//                 dtopassenger.maill = "email@gmail.com";
//                 const passh = HashPassword.hashPassword(dtopassenger.password);
//                 dtopassenger.password = passh.hash;
//                 dtopassenger.salt = passh.salt;
//                 let registerPassenger = await DataPassenger.registerPassenger(dtopassenger);
//                 if (registerPassenger === -1) {
//                     throw new Error("The passenger already exists");
//                 }
//                 console.log("The passenger registered successfully");
//             }
//             await registerPassenger();

           

//             let registerRoom1=Reservation.registerRoom(1);
//             if (registerRoom1===-1) {
//                 throw new Error("The number room already exist in the list")
//             }
//             console.log(registerRoom1);

//             let registerRoom2=Reservation.registerRoom(2);
//             if (registerRoom2===-1) {
//                 throw new Error("The number room already exist in the list")
//             }
//             console.log(registerRoom2);

//             let registerRoom3=Reservation.registerRoom(3);
//             if (registerRoom3===-1) {
//                 throw new Error("The number room already exist in the list")
//             }
//             console.log(registerRoom3);

//             let registerRoom4=Reservation.registerRoom(4);
//             if (registerRoom4===-1) {
//                 throw new Error("The number room already exist in the list")
//             }
//             console.log(registerRoom4);

            
//             let calculateTotal=await Reservation.calculateTotal();
//             if (calculateTotal===-1) {
//                 throw new Error("The list of number of rooms is empty")
//             }
//             console.log(calculateTotal);

//             let datenow=new Date();
//             let reservationdate=new Date(datenow.getFullYear(),
//                 datenow.getMonth(),datenow.getDate())
//             let arrivaldate=new Date(2022,07,07);
//             let departuredate=new Date(2022,08,01);
//             if (arrivaldate>=departuredate) {
//               throw new Error("The departure date must be greater than the arrival date")
//             }
            
//            let registerHotelReservation=await DataReservation.registerHotelReservation("111111111111111",
//             arrivaldate,departuredate,reservationdate,calculateTotal[0].Total,calculateTotal);
//             if (registerHotelReservation===-1) {
//                 throw new Error("The Passanger does not exist")
//             }
//             console.log("The reservation was added successfully");

//             let cleanNumberRoomsArray=Reservation.cleanNumberRoomsArray();
//             if (cleanNumberRoomsArray===-1) {
//                 throw new Error("The list of number rooms is empty")
//             }
//             console.log(cleanNumberRoomsArray);
            
//         //******************************************************* */

//             // let removeNumberRoomArray=Reservation.removeNumberRoomArray(2);
//             // if (removeNumberRoomArray===-1) {
//             //     throw new Error("The number room does not exist in the list")
//             // }
//             // console.log(removeNumberRoomArray);

           

//             let getNumberRoomsArray=Reservation.getNumberRoomsArray();
//             if (getNumberRoomsArray===-1) {
//                 throw new Error("The passenger does not exists");
//             }
//             console.log(getNumberRoomsArray);

//     //#endregion
//  //   #region  Online Reservation

//          let loginPassenger = await LoginPassenger.loginPassenger('111111111111111', 'Password1');
//         console.log(loginPassenger);

    
// //             let registerRoom1=Reservation.registerRoom(25);
// //             if (registerRoom1===-1) {
// //                 throw new Error("The number room already exist in the list")
// //             }
// //             console.log(registerRoom1);

//                 let registerRoom2=Reservation.registerRoom(6);
//                             if (registerRoom2===-1) {
//                                 throw new Error("The number room already exist in the list")
//                             }
//                             console.log(registerRoom2);

//                 let registerRoom3=Reservation.registerRoom(7);
//                             if (registerRoom3===-1) {
//                                 throw new Error("The number room already exist in the list")
//                             }
//                             console.log(registerRoom3);

//                 let registerRoom4=Reservation.registerRoom(8);
//                             if (registerRoom4===-1) {
//                                 throw new Error("The number room already exist in the list")
//                             }
//                             console.log(registerRoom4);


            
//             let calculateTotal=await Reservation.calculateTotal();
//             if (calculateTotal===-1) {
//                 throw new Error("The list of number of rooms is empty")
//             }
//             console.log(calculateTotal);

//             let datenow=new Date();
//             let reservationdate=new Date(datenow.getFullYear(),
//                 datenow.getMonth(),datenow.getDate())
//             let arrivaldate=new Date(2022,07,07);
//             let departuredate=new Date(2022,08,01);
//             if (arrivaldate>=departuredate) {
//               throw new Error("The departure date must be greater than the arrival date")
//             }
            
//            let registerOnlineReservation=await DataReservation.registerOnlineReservation(loginPassenger.idcard,
//             arrivaldate,departuredate,reservationdate,calculateTotal[0].Total,calculateTotal);
//             if (registerOnlineReservation===-1) {
//                 throw new Error("The Passanger does not exist")
//             }
//             console.log("The reservation was added successfully");

//             let cleanNumberRoomsArray=Reservation.cleanNumberRoomsArray();
//             if (cleanNumberRoomsArray===-1) {
//                 throw new Error("The list of number rooms is empty")
//             }
//             console.log(cleanNumberRoomsArray);
            
// //*************************************************************** */ */

//             let removeNumberRoomArray=Reservation.removeNumberRoomArray(2);
//             if (removeNumberRoomArray===-1) {
//                 throw new Error("The number room does not exist in the list")
//             }
//             console.log(removeNumberRoomArray);

           

//             let getNumberRoomsArray=Reservation.getNumberRoomsArray();
//             if (getNumberRoomsArray===-1) {
//                 throw new Error("The passenger does not exists");
//             }
//             console.log(getNumberRoomsArray);


//         let logout = await LoginPassenger.logoutPassenger();
//         console.log(logout);
    

//    // #endregion 
//    // #region  Maintenance

//     let cancelReservation=await DataReservation.cancelReservation(12);
//     if (cancelReservation===-1) {
//         throw new Error("The Reservation does not exists")
//     }
//     console.log("Reservation Canceled");


//     let confirmReservation=await DataReservation.confirmReservation(14);
//     if (confirmReservation===-1) {
//         throw new Error("The Reservation does not exists")
//     }
//     console.log("Reservation Confirmed");

//     let departuredate=new Date(2022,07,20);
//     let now=new Date();
//     let datenow=new Date(now.getFullYear(),now.getMonth()
//     ,now.getDate());
    
//     if (departuredate<=datenow) {
//         throw new Error("DepartureDate must be greater than DateNow")
//     }
//      let updateDepartureDateReservation=await DataReservation.updateDepartureDateReservation(14,departuredate);
//     if (updateDepartureDateReservation===-1) {
//         throw new Error("The Reservation does not exists")
//     }
//     if (updateDepartureDateReservation===-2) {
//         throw new Error("DepartureDate must be grater than ArrivalDate")
//     }
    
//     console.log("Reservation Departure Date updated");


//   // #endregion
//   //  #region  Detail Reservation

//     let addDetailReservation=await DataReservation.addDetailReservation(14,9);
//         if (addDetailReservation===-1) {
//             throw new Error("Detail Reservation already exists")
//         }
//         if (addDetailReservation===-2) {
//             throw new Error("Reservation does not exists")
//         }
//         if (addDetailReservation===-3) {
//             throw new Error("Room is not active")
//         }
//         console.log("Detail Reservation Added");


    
//     let removeDetailReservation=await DataReservation.removeDetailReservation(14,9);
//         if (removeDetailReservation===-1) {
//             throw new Error("Detail Reservation not exists")
//         }
//         if (removeDetailReservation===-2) {
//             throw new Error("Reservation does not exists")
//         }
//         if (removeDetailReservation===-3) {
//             throw new Error("Room is active")
//         }
//         console.log("Detail Reservation deleted");
// //#endregion
//    // #region GET
//       let getDetailReservationByReservation = await DataReservation.getDetailReservationByReservation(14,"Value");
//         console.log(getDetailReservationByReservation);

//     let getReservation = await DataReservation.getReservation(14);
//     console.log(getReservation);

//         let getReservationsByRoom = await DataReservation.getReservationsByRoom(25);
//         console.log(getReservationsByRoom);

//            let getReservations = await DataReservation.getReservations();
//         console.log(getReservations);
  
//            let getConfirmedReservations = await DataReservation.getConfirmedReservations();
//         console.log(getConfirmedReservations);

//         let getPendingReservations = await DataReservation.getPendingReservations();
//         console.log(getPendingReservations);

//         let getCanceledReservations = await DataReservation.getCanceledReservations();
//         console.log(getCanceledReservations);

//           let getReservationsByPassenger = await DataReservation.getReservationsByPassenger("111111111111111");
//         console.log(getReservationsByPassenger);

//           let getReservationsPendingByPassenger = await DataReservation.getReservationsPendingByPassenger("111111111111111");
//         console.log(getReservationsPendingByPassenger);

//         let date1=new Date(2022,06,07)
//         let date2=new Date(2022,08,09)
 
//            let getReservationsBetweenReservationDates = await DataReservation.getReservationsBetweenReservationDates(date1,date2);
//         console.log(getReservationsBetweenReservationDates);

//      let getReservationsBetweenArrivalDates = await DataReservation.getReservationsBetweenArrivalDates(date1,date2);
//         console.log(getReservationsBetweenArrivalDates);

   
//      let getReservationsBetweenDepartureDates = await DataReservation.getReservationsBetweenDepartureDates(date1,date2);
//         console.log(getReservationsBetweenDepartureDates);

//        let getSearchReservations = await DataReservation.getSearchReservations(
//         0,99999,0,9999,0,9999,"Conf","",0,9999,"",new Date(2021,08,08),
//         new Date(2022,12,03),new Date(2021,08,08),
//         new Date(2022,12,03),new Date(2021,08,08),
//         new Date(2022,12,03),
//        );
//         console.log(getSearchReservations);
         

//     //#endregion

// }
// reservationmaintenance().then()

// //#endregion
// //#region Services

// let servicemaintenance=async()=>
// {
//     for (let index = 0; index < 10; index++) {

//         let servicemaintenance=DataService.registerService(`Service${index}`,20+index);
//         if (servicemaintenance) {
//             console.log("Service Added");
//         }
       
//     }

//      let updateService=await DataService.updateService(1,50,`ServiceUpdated`);
//         if (updateService) {
//             console.log("Service Updated");
//         }

    
//      let disableService=DataService.disableService(1);
//         if (disableService) {
//             console.log("Service Disabled");
//         }

//       let getService=await DataService.getService(2);
//       if (getService===-1) {
//         throw new Error("Service does not exists")
//       }
//       console.log(getService);
    
   
//       let getServices=await DataService.getServices();
//       console.log(getServices);

//       let getServicesBetweenValues=await DataService.getServicesBetweenValues(23,40);
//        console.log(getServicesBetweenValues);

//         let arrayidservices=[2,5,8];
//       let getServicesMultipleID=await DataService.getServicesMultipleID(arrayidservices);
//        console.log(getServicesMultipleID);

//           let getSearchServices=await DataService.getSearchServices();
//        console.log(getSearchServices);

 
    
   
// }
// servicemaintenance().then()

// //#endregion
// //#region Passenger Services

// let passengerservicemaintenance=async()=>
// {
 
//      //  Get passenger
//              let getPassenger = await DataPassenger.getPassenger("58656455446");
//              if (getPassenger===-1) {
//                 throw new Error("The Passenger does not exists")
//              }
//              console.log(getPassenger);

//           //  If the passenger does not exist
            
            
//             async function registerPassenger() {

//                 let dtopassenger = new DTOPassenger();
//                 dtopassenger.idcard = "58656455446";
//                 dtopassenger.name = "NamePassenger";
//                 dtopassenger.surname = "SurnamePassenger";
//                 dtopassenger.country = "Country";
//                 dtopassenger.password = "Password";
//                 dtopassenger.town = "Town";
//                 dtopassenger.address = "Address";
//                 dtopassenger.phone = "111111111";
//                 dtopassenger.maill = "email@gmail.com";
//                 const passh = HashPassword.hashPassword(dtopassenger.password);
//                 dtopassenger.password = passh.hash;
//                 dtopassenger.salt = passh.salt;
//                 let registerPassenger = await DataPassenger.registerPassenger(dtopassenger);
//                 if (registerPassenger === -1) {
//                     throw new Error("The passenger already exists");
//                 }
//                 console.log("The passenger registered successfully");
//             }
//             await registerPassenger();

           

//             let registerService=Services.registerService(2);
//             if (registerService===-1) {
//                 throw new Error("The number service already exist in the list")
//             }
//             console.log(registerService);

//             let registerService2=Services.registerService(3);
//             if (registerService2===-1) {
//                 throw new Error("The number service already exist in the list")
//             }
//             console.log(registerService2);

//             let calculateTotal=await Services.calculateTotal();
//             if (calculateTotal===-1) {
//                 throw new Error("The list of number of services is empty")
//             }
//             console.log(calculateTotal);

        
          
//             let startdate=new Date(2022,07,07);
//             let enddate=new Date(2022,08,01);
//             if (startdate>=enddate) {
//               throw new Error("The end date must be greater than the start date")
//             }
//            let registerPassengerService=await DataPassengerService.registerPassengerService("1111111111111113",
//            startdate,enddate,calculateTotal[0].Total,"Obs1",calculateTotal);
//             if (registerPassengerService===-1) {
//                 throw new Error("The Passanger does not exist")
//             }
//             console.log("The Passenger service was added successfully");

//               let cleanNumberServiceArray=Services.cleanNumberServiceArray();
//             if (cleanNumberServiceArray===-1) {
//                 throw new Error("The list of number services is empty")
//             }
//             console.log(cleanNumberServiceArray);
    

//             let removeNumberServiceArray=Services.removeNumberServiceArray(2);
//             if (removeNumberServiceArray===-1) {
//                 throw new Error("The number service does not exist in the list")
//             }
//             console.log(removeNumberServiceArray);

           

//             let getNumberServiceArray=Services.getNumberServiceArray();
//             if (getNumberServiceArray===-1) {
//                 throw new Error("The number services list is empty");
//             }
//             console.log(getNumberServiceArray);

//           //  ******************************************************************************* */

//             let addDetailPS=await DataPassengerService.addDetailPS(1,6);
//             if (addDetailPS===-1) {
//                 throw new Error("Detail Passenger Service already exists")
//             }
//             if (addDetailPS===-2) {
//                 throw new Error("Passenger Service does not exists")
//             }
//             if (addDetailPS===-3) {
//                 throw new Error("Servicee is not active")
//             }
//             console.log("Detail Passenger Service Added");

            
//                 let removeDetailPS=await DataPassengerService.removeDetailPS(1,3);
//                 if (removeDetailPS===-1) {
//                     throw new Error("Detail Passenger Service does not exists")
//                 }
//                 if (removeDetailPS===-2) {
//                        throw new Error("Passenger Service does not exists")
//                 }
//                 if (removeDetailPS===-3) {
//                     throw new Error("Servicee is not active")
//                 }
//                 console.log("Detail Passenger Service deleted");

//              let departuredate=new Date(2022,07,20);
//             let now=new Date();
//             let datenow=new Date(now.getFullYear(),now.getMonth()
//             ,now.getDate());
            
//             if (departuredate<=datenow) {
//                 throw new Error("DepartureDate must be greater than DateNow")
//             }
//              let updateEndDatePassengerService=await DataPassengerService.updateEndDatePassengerService(1,departuredate);
//             if (updateEndDatePassengerService===-1) {
//                 throw new Error("The Passenger Service does not exists")
//             }
//             if (updateEndDatePassengerService===-2) {
//                 throw new Error("EndDate must be grater than ArrivalDate")
//             }
            
//             console.log("Passenger Service End Date updated");

//                 let getDetailPSByPassengerService=await DataPassengerService.getDetailPSByPassengerService(1);
//                 console.log(getDetailPSByPassengerService);
                

//            // #region GETS

//              let getPassengerServices=await DataPassengerService.getPassengerServices();
//               console.log(getPassengerServices);

//                let getPassengerService=await DataPassengerService.getPassengerService(1);
//               console.log(getPassengerService);

//                let getPassengerServiceByService=await DataPassengerService.getPassengerServiceByService(6);
//               console.log(getPassengerServiceByService);

//                  let getPassengerServiceByService=await DataPassengerService.getPassengerServiceByPassenger("111111111111111");
//               console.log(getPassengerServiceByService);

               
//             let date1=new Date(2022,07,07);
//             let date2=new Date(2022,09,01);
//             if (date1>=date2) {
//               throw new Error("The first date must be greater than the second date")
//             }

//               let getPassengerServiceBetweenStartDate=await DataPassengerService.getPassengerServiceBetweenStartDate(date1,date2);
//               console.log(getPassengerServiceBetweenStartDate);

//                 let getPassengerServiceBetweenEndDate=await DataPassengerService.getPassengerServiceBetweenEndDate(date1,date2);
//               console.log(getPassengerServiceBetweenEndDate);

//             let arraynumberps=[1,2];

//             let getPassengerServicesMultipleNumber=await DataPassengerService.getPassengerServicesMultipleNumber(arraynumberps);
//               console.log(getPassengerServicesMultipleNumber);
            

//                 let getSearchPassengerService = await DataPassengerService.getSearchPassengerService(
//                            0,99999,0,9999,0,9999,"",
//                         new Date(2021,12,03),new Date(2022,08,08),
//                         new Date(2021,12,03),new Date(2022,08,08),
//                        0,9999,"amount"
//             );
//                 console.log(getSearchPassengerService);
            
//             //#endregion


// }
// passengerservicemaintenance().then()

// //#endregion
// //#region  Payment

// let paymentmaintenace=async()=>
// {
//     let datenow=new Date();
//     let paymentdate=new Date(datenow.getFullYear(),
//     datenow.getMonth(),datenow.getDate());

//     let getReservation = await DataReservation.getReservation(14);
//     console.log(getReservation);


//     let getPassengerService = await DataPassengerService.getPassengerService(1);
//     console.log(getPassengerService);
 

//     let totalpayment=getReservation.TotalWithNumberDays().totalwithdays+getPassengerService.TotalWithNumberDays().totalwithdays;
//     console.log(totalpayment);
//     let passengeramount=5000;
//     if (totalpayment>passengeramount) {
//         throw new Error("The Passenger Amount must be greater than TotalPayment");
//     }
//      let registerPayment=await DataPayment.registerPayment("111111111111111"
//      ,getReservation.NumberReservationn,getPassengerService.NumberPS
//       ,passengeramount,paymentdate,totalpayment );
//      if (registerPayment===-1) {
//         throw new Error("Reservation does not exist");
//          }
//      if (registerPayment===-2) {
//         throw new Error("Passenger Service does not exist");
//          }
//      console.log(registerPayment);

//       let getPayment = await DataPayment.getPayment(1);
//        console.log(getPayment);

//         let array=[1,3,4];
//         let getPaymentMultipleId = await DataPayment.getPaymentMultipleId(array);
//        console.log(getPaymentMultipleId);

//       let getSearchPayment = await DataPayment.getSearchPayment(
//         0,9999,0,99999,0,99999,"1111111",
//         new Date(2022,06,02),new Date(2022,08,02));
//       console.log(getSearchPayment);

// }
// paymentmaintenace().then()

// //#endregion



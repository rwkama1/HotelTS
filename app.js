
const { DataPassenger } = require("./data/DataPassenger");
const { DataPassengerService } = require("./data/DataPassengerService");
const { DataReservation } = require("./data/DataReservation");
const { DataRoom } = require("./data/DataRoom");
const { DataService } = require("./data/DataService");
const { DataUser } = require("./data/DataUser");
const { DTOPassenger } = require("./DTO/DTOPassenger");
const { DTOReservation } = require("./DTO/DTOReservation");
const { DTORoom } = require("./DTO/DTORoom");
const { DTOUser } = require("./DTO/DTOUser");
const { HashPassword } = require("./Hash_Login/hashPassword");
const { LoginPassenger } = require("./Hash_Login/LoginPassenger");
const { LoginUser } = require("./Hash_Login/LoginUser");
const { Reservation } = require("./Reservation/reservation");
const { Services } = require("./Services/services");

//#region Passenger
let passengermaintenance=async()=>
{

    // async function registerPassenger() {
    //     for (let index = 1; index < 100; index++) {
    //         let dtopassenger =new DTOPassenger();
    //         dtopassenger.idcard = "11111111111111" + index.toString();
    //         dtopassenger.name = "NamePassenger" + index.toString();
    //         dtopassenger.surname = "SurnamePassenger" + index.toString();
    //         dtopassenger.country = "Country" + index.toString();
    //         dtopassenger.password = "Password" + index.toString();
    //         dtopassenger.town = "Town" + index.toString();
    //         dtopassenger.address = "Address" + index.toString();
    //         dtopassenger.phone = "111111111" + index.toString();
    //         dtopassenger.maill ="email" + index.toString() + "@gmail.com";
    //         const passh = HashPassword.hashPassword(dtopassenger.password);
    //         dtopassenger.password = passh.hash;
    //         dtopassenger.salt = passh.salt;
    //         let registerPassenger = await DataPassenger.registerPassenger(dtopassenger);
    //         if (registerPassenger===-1) {
    //             throw new Error("The passenger already exists");
    //         }
    //         console.log("The passenger registered successfully");
    //     }
    // }
    //  await registerPassenger();

    
    // async function updatePassenger() {
    //     let dtopassenger = new DTOPassenger();
    //     dtopassenger.idcard = "111111111111111"; 
    //      dtopassenger.name = "NamePassengerUpdate" ;
    //      dtopassenger.surname = "SurnamePassgerUpdate"; 
    //      dtopassenger.country = "CountryUpdate"; 
    //     dtopassenger.town = "TownUpdate";
    //     dtopassenger.address = "AddressUpdate";
    //     dtopassenger.phone = "11111111125";
    //      dtopassenger.maill ="emailupdate@gmail.com";
    //     let updatePassenger = await DataPassenger.updatePassenger(dtopassenger);
    //      if (updatePassenger===-1) {
    //             throw new Error("The passenger does not exists");
    //     }
    //     console.log("The passenger updated successfully");
    // }
    // await updatePassenger();

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


    // async function inactivePassenger() {
    
    //         let inactivePassenger = await DataPassenger.inactivePassenger("111111111111111");
    //         if (inactivePassenger===-1) {
    //             throw new Error("The passenger does not exists");
    //         }
    //         console.log("The passenger was deleted successfully");

    //     }
    //   await inactivePassenger();

    
        // let loginPassenger = await LoginPassenger.loginPassenger('1111111111111112', 'Password2');
        // console.log(loginPassenger);


        // let getPassengerLogin = await LoginPassenger.getPassengerLogin();
        // console.log(getPassengerLogin);

        // let logout = await LoginPassenger.logoutPassenger();
        // console.log(logout);
    
    // let getPassenger = await DataPassenger.getPassenger("1111111111111112");
    // console.log(getPassenger);

    //   let getPassengers = await DataPassenger.getPassengers("lastname");
    // console.log(getPassengers);

    //    let getSearchPassengers = await DataPassenger.getSearchPassengers("","",
    //    "","","","","","country");
    // console.log(getSearchPassengers);



 }
passengermaintenance().then()

//#endregion
//#region User
let usermaintenace=async()=>
{

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


    // async function updateUser() {
    //         let dtouser = new DTOUser();
    //         dtouser.IDCard = "111111111111111"; 
    //         dtouser.NamesUser = "NameUserupd" ;
    //         dtouser.LastName = "SurnameUserupd";
    //         dtouser.Addresss = "Addressupdate" ;
    //         dtouser.PhoneNumber = "111111112";
    //         dtouser.TypeUser = "Townupdate" ;
    //         dtouser.Mail ="emailupddate@gmail.com";
    //         let updateUser = await DataUser.updateUser(dtouser);
    //         if (updateUser===-1) {
    //                 throw new Error("The user does not exists");
    //         }
    //     console.log("The user updated successfully");
    // }
    // await updateUser();

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


    // async function inactiveUser() {
    
    //         let inactiveUser = await DataUser.inactiveUser("111111111111119");
    //         if (inactiveUser===-1) {
    //             throw new Error("The user does not exists");
    //         }
    //         console.log("The user was deleted successfully");

    //     }
    //   await inactiveUser();

    
        // let loginUser = await LoginUser.loginUser('111111111111111', 'Password2');
        // console.log(loginUser);


        // let getUserLogin = await LoginUser.getUserLogin();
        // console.log(getUserLogin);

        // let logoutUser = await LoginUser.logoutUser();
        // console.log(logoutUser);
    
    // let getUser = await DataUser.getUser("1111111111111112");
    // console.log(getUser);

    //   let getUsers = await DataUser.getUsers("Mail");
    // console.log(getUsers);

    //    let getSearchUsers = await DataUser.getSearchUsers("","",
    //    "","","","","mail");
    // console.log(getSearchUsers);

}
usermaintenace().then()
//#endregion
//#region Room

let roommaintenance=async()=>
{

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


    // async function updateRoom() {
    //         let dtoroom = new DTORoom();
    //         dtoroom.NumberRoomm = 60;
    //         dtoroom.Typee = "TypeeUpdate" 
    //         dtoroom.Typebed = "Typebedupdate"
    //          dtoroom.Accommodation = "AccommodationUp"
    //           dtoroom.Descriptionn = "DescriptionnUP"
    //         dtoroom.Value = 99 ;
    //          dtoroom.Imagee ="urlimageup" 
    //          dtoroom.Squaremeter = 38;
    //         let updateRoom = await DataRoom.updateRoom(dtoroom);
    //         if (updateRoom===-1) {
    //          throw new Error("The room does not exists");
    //         }
    //     console.log("The room updated successfully");
    // }
    // await updateRoom();

    // async function inactiveRoom() {
    
    //         let inactiveRoom = await DataRoom.inactiveRoom(5);
    //         if (inactiveRoom===-1) {
    //             throw new Error("The room does not exists");
    //         }
    //         console.log("The room was deleted successfully");

    //     }
    //  await inactiveRoom();

    
    // let getRoom = await DataRoom.getRoom(1);
    // console.log(getRoom);

    //   let getRooms = await DataRoom.getRooms("Value");
    // console.log(getRooms);

    //    let getSearchRoom = await DataRoom.getSearchRoom("","",
    //    "",145,150,39,45,"value");
    // console.log(getSearchRoom);

    //  let getRoomsMultipleNumbers = await DataRoom.getRoomsMultipleNumbers([2,5,6,8,9]);
    // console.log(getRoomsMultipleNumbers);

}
roommaintenance().then()

//#endregion
//#region  Reservation

let reservationmaintenance=async()=>
{

    //#region  Hotel Reservation


            //Get passenger
            //  let getPassenger = await DataPassenger.getPassenger("58656455446");
            //  if (getPassenger===-1) {
            //     throw new Error("The Passenger does not exists")
            //  }
            //  console.log(getPassenger);

            // If the passenger does not exist
            
            
            // async function registerPassenger() {

            //     let dtopassenger = new DTOPassenger();
            //     dtopassenger.idcard = "58656455446";
            //     dtopassenger.name = "NamePassenger";
            //     dtopassenger.surname = "SurnamePassenger";
            //     dtopassenger.country = "Country";
            //     dtopassenger.password = "Password";
            //     dtopassenger.town = "Town";
            //     dtopassenger.address = "Address";
            //     dtopassenger.phone = "111111111";
            //     dtopassenger.maill = "email@gmail.com";
            //     const passh = HashPassword.hashPassword(dtopassenger.password);
            //     dtopassenger.password = passh.hash;
            //     dtopassenger.salt = passh.salt;
            //     let registerPassenger = await DataPassenger.registerPassenger(dtopassenger);
            //     if (registerPassenger === -1) {
            //         throw new Error("The passenger already exists");
            //     }
            //     console.log("The passenger registered successfully");
            // }
            // await registerPassenger();

           

        //     let registerRoom1=Reservation.registerRoom(1);
        //     if (registerRoom1===-1) {
        //         throw new Error("The number room already exist in the list")
        //     }
        //     console.log(registerRoom1);

        //     let registerRoom2=Reservation.registerRoom(2);
        //     if (registerRoom2===-1) {
        //         throw new Error("The number room already exist in the list")
        //     }
        //     console.log(registerRoom2);

        //     let registerRoom3=Reservation.registerRoom(3);
        //     if (registerRoom3===-1) {
        //         throw new Error("The number room already exist in the list")
        //     }
        //     console.log(registerRoom3);

        //     let registerRoom4=Reservation.registerRoom(4);
        //     if (registerRoom4===-1) {
        //         throw new Error("The number room already exist in the list")
        //     }
        //     console.log(registerRoom4);

            
        //     let calculateTotal=await Reservation.calculateTotal();
        //     if (calculateTotal===-1) {
        //         throw new Error("The list of number of rooms is empty")
        //     }
        //     console.log(calculateTotal);

        //     let datenow=new Date();
        //     let reservationdate=new Date(datenow.getFullYear(),
        //         datenow.getMonth(),datenow.getDate())
        //     let arrivaldate=new Date(2022,07,07);
        //     let departuredate=new Date(2022,08,01);
        //     if (arrivaldate>=departuredate) {
        //       throw new Error("The departure date must be greater than the arrival date")
        //     }
            
        //    let registerHotelReservation=await DataReservation.registerHotelReservation("111111111111111",
        //     arrivaldate,departuredate,reservationdate,calculateTotal[0].Total,calculateTotal);
        //     if (registerHotelReservation===-1) {
        //         throw new Error("The Passanger does not exist")
        //     }
        //     console.log("The reservation was added successfully");

        //     let cleanNumberRoomsArray=Reservation.cleanNumberRoomsArray();
        //     if (cleanNumberRoomsArray===-1) {
        //         throw new Error("The list of number rooms is empty")
        //     }
        //     console.log(cleanNumberRoomsArray);
            
        // //******************************************************* */

        //     // let removeNumberRoomArray=Reservation.removeNumberRoomArray(2);
        //     // if (removeNumberRoomArray===-1) {
        //     //     throw new Error("The number room does not exist in the list")
        //     // }
        //     // console.log(removeNumberRoomArray);

           

        //     let getNumberRoomsArray=Reservation.getNumberRoomsArray();
        //     if (getNumberRoomsArray===-1) {
        //         throw new Error("The passenger does not exists");
        //     }
        //     console.log(getNumberRoomsArray);

    //#endregion
    //#region  Online Reservation

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
            
////*************************************************************** */ */

            // let removeNumberRoomArray=Reservation.removeNumberRoomArray(2);
            // if (removeNumberRoomArray===-1) {
            //     throw new Error("The number room does not exist in the list")
            // }
            // console.log(removeNumberRoomArray);

           

        //     let getNumberRoomsArray=Reservation.getNumberRoomsArray();
        //     if (getNumberRoomsArray===-1) {
        //         throw new Error("The passenger does not exists");
        //     }
        //     console.log(getNumberRoomsArray);


        // let logout = await LoginPassenger.logoutPassenger();
        // console.log(logout);
    

    //#endregion 
    //#region  Maintenance

    // let cancelReservation=await DataReservation.cancelReservation(12);
    // if (cancelReservation===-1) {
    //     throw new Error("The Reservation does not exists")
    // }
    // console.log("Reservation Canceled");


    // let confirmReservation=await DataReservation.confirmReservation(14);
    // if (confirmReservation===-1) {
    //     throw new Error("The Reservation does not exists")
    // }
    // console.log("Reservation Confirmed");

    // let departuredate=new Date(2022,07,20);
    // let now=new Date();
    // let datenow=new Date(now.getFullYear(),now.getMonth()
    // ,now.getDate());
    
    // if (departuredate<=datenow) {
    //     throw new Error("DepartureDate must be greater than DateNow")
    // }
    //  let updateDepartureDateReservation=await DataReservation.updateDepartureDateReservation(14,departuredate);
    // if (updateDepartureDateReservation===-1) {
    //     throw new Error("The Reservation does not exists")
    // }
    // if (updateDepartureDateReservation===-2) {
    //     throw new Error("DepartureDate must be grater than ArrivalDate")
    // }
    
    // console.log("Reservation Departure Date updated");


    //#endregion
    //#region  Detail Reservation

    // let addDetailReservation=await DataReservation.addDetailReservation(14,9);
    //     if (addDetailReservation===-1) {
    //         throw new Error("Detail Reservation already exists")
    //     }
    //     if (addDetailReservation===-2) {
    //         throw new Error("Reservation does not exists")
    //     }
    //     if (addDetailReservation===-3) {
    //         throw new Error("Room is not active")
    //     }
    //     console.log("Detail Reservation Added");


    
    // let removeDetailReservation=await DataReservation.removeDetailReservation(14,9);
    //     if (removeDetailReservation===-1) {
    //         throw new Error("Detail Reservation not exists")
    //     }
    //     if (removeDetailReservation===-2) {
    //         throw new Error("Reservation does not exists")
    //     }
    //     if (removeDetailReservation===-3) {
    //         throw new Error("Room is active")
    //     }
    //     console.log("Detail Reservation deleted");

    //   let getDetailReservationByReservation = await DataReservation.getDetailReservationByReservation(14,"Value");
    //     console.log(getDetailReservationByReservation);

    // let getReservation = await DataReservation.getReservation(14);
    // console.log(getReservation);

        // let getReservationsByRoom = await DataReservation.getReservationsByRoom(25);
        // console.log(getReservationsByRoom);

        //    let getReservations = await DataReservation.getReservations();
        // console.log(getReservations);
  
        //    let getConfirmedReservations = await DataReservation.getConfirmedReservations();
        // console.log(getConfirmedReservations);

        // let getPendingReservations = await DataReservation.getPendingReservations();
        // console.log(getPendingReservations);

        // let getCanceledReservations = await DataReservation.getCanceledReservations();
        // console.log(getCanceledReservations);

        //   let getReservationsByPassenger = await DataReservation.getReservationsByPassenger("111111111111111");
        // console.log(getReservationsByPassenger);

        //   let getReservationsByPassenger = await DataReservation.getReservationsPendingByPassenger("111111111111111");
        // console.log(getReservationsByPassenger);

        // let date1=new Date(2022,06,07)
        // let date2=new Date(2022,08,09)
 
        //    let getReservationsBetweenReservationDates = await DataReservation.getReservationsBetweenReservationDates(date1,date2);
        // console.log(getReservationsBetweenReservationDates);

    //  let getReservationsBetweenArrivalDates = await DataReservation.getReservationsBetweenArrivalDates(date1,date2);
    //     console.log(getReservationsBetweenArrivalDates);

   
    //  let getReservationsBetweenDepartureDates = await DataReservation.getReservationsBetweenDepartureDates(date1,date2);
    //     console.log(getReservationsBetweenDepartureDates);

    //    let getSearchReservations = await DataReservation.getSearchReservations(
    //     0,99999,0,9999,0,9999,"Conf","",0,9999,"",new Date(2021,08,08),
    //     new Date(2022,12,03),new Date(2021,08,08),
    //     new Date(2022,12,03),new Date(2021,08,08),
    //     new Date(2022,12,03),
    //    );
    //     console.log(getSearchReservations);
         

    //#endregion

}
reservationmaintenance().then()

//#endregion
//#region Services

let servicemaintenance=async()=>
{
    // for (let index = 0; index < 10; index++) {

    //     let servicemaintenance=DataService.registerService(`Service${index}`,20+index);
    //     if (servicemaintenance) {
    //         console.log("Service Added");
    //     }
       
    // }

    //  let servicemaintenance=await DataService.updateService(1,50,`ServiceUpdated`);
    //     if (servicemaintenance) {
    //         console.log("Service Updated");
    //     }

    
    //  let servicemaintenance=DataService.disableService(1);
    //     if (servicemaintenance) {
    //         console.log("Service Disabled");
    //     }

    //   let getService=await DataService.getService(2);
    //   if (getService===-1) {
    //     throw new Error("Service does not exists")
    //   }
    //   console.log(getService);
    
   
    //   let getServices=await DataService.getServices();
    //   console.log(getServices);

    //   let getServicesBetweenValues=await DataService.getServicesBetweenValues(23,40);
    //    console.log(getServicesBetweenValues);

    //     let arrayidservices=[2,5,8];
    //   let getServicesMultipleID=await DataService.getServicesMultipleID(arrayidservices);
    //    console.log(getServicesMultipleID);

    //       let getSearchServices=await DataService.getSearchServices();
    //    console.log(getSearchServices);

 
    
   
}
servicemaintenance().then()

//#endregion
//#region Passenger Services

let passengerservicemaintenance=async()=>
{
 
       //Get passenger
            //  let getPassenger = await DataPassenger.getPassenger("58656455446");
            //  if (getPassenger===-1) {
            //     throw new Error("The Passenger does not exists")
            //  }
            //  console.log(getPassenger);

            // If the passenger does not exist
            
            
            // async function registerPassenger() {

            //     let dtopassenger = new DTOPassenger();
            //     dtopassenger.idcard = "58656455446";
            //     dtopassenger.name = "NamePassenger";
            //     dtopassenger.surname = "SurnamePassenger";
            //     dtopassenger.country = "Country";
            //     dtopassenger.password = "Password";
            //     dtopassenger.town = "Town";
            //     dtopassenger.address = "Address";
            //     dtopassenger.phone = "111111111";
            //     dtopassenger.maill = "email@gmail.com";
            //     const passh = HashPassword.hashPassword(dtopassenger.password);
            //     dtopassenger.password = passh.hash;
            //     dtopassenger.salt = passh.salt;
            //     let registerPassenger = await DataPassenger.registerPassenger(dtopassenger);
            //     if (registerPassenger === -1) {
            //         throw new Error("The passenger already exists");
            //     }
            //     console.log("The passenger registered successfully");
            // }
            // await registerPassenger();

           

        //     let registerService=Services.registerService(2);
        //     if (registerService===-1) {
        //         throw new Error("The number service already exist in the list")
        //     }
        //     console.log(registerService);

        //     let registerService2=Services.registerService(3);
        //     if (registerService2===-1) {
        //         throw new Error("The number service already exist in the list")
        //     }
        //     console.log(registerService2);

        //     let calculateTotal=await Services.calculateTotal();
        //     if (calculateTotal===-1) {
        //         throw new Error("The list of number of services is empty")
        //     }
        //     console.log(calculateTotal);

        
          
            // let startdate=new Date(2022,07,07);
            // let enddate=new Date(2022,08,01);
        //     if (startdate>=enddate) {
        //       throw new Error("The end date must be greater than the start date")
        //     }
        //    let registerPassengerService=await DataPassengerService.registerPassengerService("1111111111111113",
        //    startdate,enddate,calculateTotal[0].Total,"Obs1",calculateTotal);
        //     if (registerPassengerService===-1) {
        //         throw new Error("The Passanger does not exist")
        //     }
        //     console.log("The Passenger service was added successfully");

            //   let cleanNumberServiceArray=Services.cleanNumberServiceArray();
            // if (cleanNumberServiceArray===-1) {
            //     throw new Error("The list of number services is empty")
            // }
            // console.log(cleanNumberServiceArray);
    

            // let removeNumberServiceArray=Services.removeNumberServiceArray(2);
            // if (removeNumberServiceArray===-1) {
            //     throw new Error("The number service does not exist in the list")
            // }
            // console.log(removeNumberServiceArray);

           

            // let getNumberServiceArray=Services.getNumberServiceArray();
            // if (getNumberServiceArray===-1) {
            //     throw new Error("The number services list is empty");
            // }
            // console.log(getNumberServiceArray);

            //******************************************************************************* */

            // let addDetailPS=await DataPassengerService.addDetailPS(1,6);
            // if (addDetailPS===-1) {
            //     throw new Error("Detail Passenger Service already exists")
            // }
            // if (addDetailPS===-2) {
            //     throw new Error("Passenger Service does not exists")
            // }
            // if (addDetailPS===-3) {
            //     throw new Error("Servicee is not active")
            // }
            // console.log("Detail Passenger Service Added");

            
                // let removeDetailPS=await DataPassengerService.removeDetailPS(1,3);
                // if (removeDetailPS===-1) {
                //     throw new Error("Detail Passenger Service does not exists")
                // }
                // if (removeDetailPS===-2) {
                //        throw new Error("Passenger Service does not exists")
                // }
                // if (removeDetailPS===-3) {
                //     throw new Error("Servicee is not active")
                // }
                // console.log("Detail Passenger Service deleted");

            //  let departuredate=new Date(2022,07,20);
            // let now=new Date();
            // let datenow=new Date(now.getFullYear(),now.getMonth()
            // ,now.getDate());
            
            // if (departuredate<=datenow) {
            //     throw new Error("DepartureDate must be greater than DateNow")
            // }
            //  let updateEndDatePassengerService=await DataPassengerService.updateEndDatePassengerService(1,departuredate);
            // if (updateEndDatePassengerService===-1) {
            //     throw new Error("The Passenger Service does not exists")
            // }
            // if (updateEndDatePassengerService===-2) {
            //     throw new Error("EndDate must be grater than ArrivalDate")
            // }
            
            // console.log("Passenger Service End Date updated");

                // let getDetailPSByPassengerService=await DataPassengerService.getDetailPSByPassengerService(1);
                // console.log(getDetailPSByPassengerService);
                

            //#region GETS

            //  let getPassengerServices=await DataPassengerService.getPassengerServices();
            //   console.log(getPassengerServices);

            //    let getPassengerService=await DataPassengerService.getPassengerService(1);
            //   console.log(getPassengerService);

            //    let getPassengerServiceByService=await DataPassengerService.getPassengerServiceByService(6);
            //   console.log(getPassengerServiceByService);

            //      let getPassengerServiceByService=await DataPassengerService.getPassengerServiceByPassenger("111111111111111");
            //   console.log(getPassengerServiceByService);

               
            // let date1=new Date(2022,07,07);
            // let date2=new Date(2022,09,01);
            // if (date1>=date2) {
            //   throw new Error("The first date must be greater than the second date")
            // }

            //   let getPassengerServiceBetweenStartDate=await DataPassengerService.getPassengerServiceBetweenStartDate(date1,date2);
            //   console.log(getPassengerServiceBetweenStartDate);

            //     let getPassengerServiceBetweenEndDate=await DataPassengerService.getPassengerServiceBetweenEndDate(date1,date2);
            //   console.log(getPassengerServiceBetweenEndDate);

            // let arraynumberps=[1,2];

            // let getPassengerServicesMultipleNumber=await DataPassengerService.getPassengerServicesMultipleNumber(arraynumberps);
            //   console.log(getPassengerServicesMultipleNumber);
            

            //     let getSearchPassengerService = await DataPassengerService.getSearchPassengerService(
            //                0,99999,0,9999,0,9999,"",
            //             new Date(2021,12,03),new Date(2022,08,08),
            //             new Date(2021,12,03),new Date(2022,08,08),
            //            0,9999,"amount"
            // );
            //     console.log(getSearchPassengerService);
            
            //#endregion


}
passengerservicemaintenance().then()

//#endregion
//#region  Payment

let paymentmaintenace=async()=>
{
    
}
paymentmaintenace().then()
//#endregion



//#region Others

//const {FactoryLogic}=require("./Hotel/dist/logic/FactoryLogic");
// const { default: DTOPassenger } = require("./Hotel/dist/shared/entity/DTOPassenger");
// const { default: DTORoom } = require("./Hotel/dist/shared/entity/DTORoom");
// const { default: DTOService } = require("./Hotel/dist/shared/entity/DTOService");
// const { default: DTOUser } = require("./Hotel/dist/shared/entity/DTOUser");
// const { default: DTOReservation } = require("./Hotel/dist/shared/entity/DTOReservation");
// const { default: DTOReservationDetail } = require("./Hotel/dist/shared/entity/DTOReservationDetail");
//  const { default: DTOPassengerService } = require("./Hotel/dist/shared/entity/DTOPassengerService");
//  const { default: DTODPassengerService } = require("./Hotel/dist/shared/entity/DTODPassengerService");


// let dtuser=new DTOUser("75456546",
// "ksdgsdgsdg","User1","Adress3",
// "79789797","Administrator",
// "Password12345","","mail2@gmail.com","");

// let dtpassenger=new DTOPassenger("6789798",
// "qwrfas","User1","USA","New York","Address",
// "79789797","mailpassenger@gmail.com",
// "","Password12345","");


// let dtoroom=new DTORoom(7,
//   "dfhdfh","dfshdfh",
//   "safasf","asgagasgasgasgasasg",50.55,"Active","asd.jpg");

// let dtoservice=new DTOService(2,"Service2",9.10);

// let dtoreservation=new DTOReservation(1,"September 17, 2021", new Date("October 17, 2021"),
//  new Date("November 17, 2021"),"Confirmed","Confirmed","Hotel",546,"6789798",[]);


//  let dtopassengerservice=new DTOPassengerService(0,"456456546",new Date("October 02,2021"),new Date("October 8,2021"),0,"asd",[]);

// ************************ USER MAINTENACE ******************** */

// FactoryLogic.UserController().registerUser(dtuser).then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().updateUser(dtuser).then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().inactivateUser(dtuser).then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().getUser("75456546").then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().getLActiveSortUsers().then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().getUsers().then(data => {
//     console.log(data);
// });
// let autenticationuser=async()=>
// {
//     let login=await FactoryLogic.UserController().loginUser("8545654654","Password12345");
//     console.log(login);
//     let userlogin= FactoryLogic.UserController().getloginUser();
//     console.log(userlogin);
//     let logout= FactoryLogic.UserController().logout();
//     console.log(logout);

// }
// autenticationuser().then(

// )

//   ********************** PASSENGER MAINTENACE ************************** */

// FactoryLogic.PassengerController().registerPassenger(dtpassenger).then(data => {
//     console.log(data);
// });
// FactoryLogic.PassengerController().updatePassanger(dtpassenger).then(data => {
//   console.log(data);
// });
// FactoryLogic.PassengerController().inactivatePassanger(dtpassenger).then(data => {
//   console.log(data);
// });
// FactoryLogic.PassengerController().getPassanger("456456546").then(data => {
//     console.log(data);
// });
// FactoryLogic.PassengerController().getPassangers().then(data => {
//     console.log(data);
// });
// FactoryLogic.PassengerController().getLActiveSortPassengers().then(data => {
//     console.log(data);
// });
// let autenticationpassenger=async()=>
// {
//     let login=await FactoryLogic.PassengerController().loginPassenger("456456546","Passenger12345");
//     console.log(login);
//     let logout= FactoryLogic.PassengerController().logout();
//     console.log(logout);
//     let userlogin= FactoryLogic.PassengerController().getloginPassenger();
//     console.log(userlogin);
// }
// autenticationpassenger().then(

// )
// ***********************  ROOM MAINTENANCE ************************* */

// FactoryLogic.RoomController().registerRoom(dtoroom).then(data => {
//     console.log(data);
// });
// FactoryLogic.RoomController().updateRoom(dtoroom).then(data => {
//   console.log(data);
// });
// FactoryLogic.RoomController().inactiveRoom(dtoroom).then(data => {
//   console.log(data);
// });
// FactoryLogic.RoomController().getRooms().then(data => {
//   console.log(data);
// });
// FactoryLogic.RoomController().getRoom(1).then(data => {
//   console.log(data);
// });
// FactoryLogic.RoomController().getLActiveSortRooms().then(data => {
//   console.log(data);
// });

// *********************** SERVICE MAINTENANCE ************************ */

// FactoryLogic.ServiceController().registerService(dtoservice).then(data => {
//     console.log(data);
// });
// FactoryLogic.ServiceController().updateService(dtoservice).then(data => {
//     console.log(data);
// });
// FactoryLogic.ServiceController().disableService(dtoservice).then(data => {
//   console.log(data);
// });
// FactoryLogic.ServiceController().getServices().then(data => {
//     console.log(data);
// });
// FactoryLogic.ServiceController().getService(1).then(data => {
//   console.log(data);
// });

// ************************** RESERVATION MAINTENANCE ******************* */

//  HOTEL

// let registerReservation=async()=>
// {
//     let enterp=await FactoryLogic.ReservationController().enterPassenger("456456546");
//     console.log(enterp);
//     if(enterp===false)
//     {
//     let p=await FactoryLogic.ReservationController().registerPassenger(dtpassenger);
//      console.log(p);
//     }
//     let listreservation= await FactoryLogic.RoomController().getLActiveSortRooms();
//     console.log(listreservation);

//     let regdetailr=await FactoryLogic.ReservationController().registerReservationDetail(7);
//     console.log(regdetailr);
//     // let regdetailr1=await FactoryLogic.ReservationController().registerReservationDetail(2);
//     // console.log(regdetailr1);
//     // let regdetailr6=await FactoryLogic.ReservationController().removeReservationDetail(3);
//     // console.log(regdetailr6);

//     let closer=await FactoryLogic.ReservationController().closeReservation(dtoreservation);
//     console.log(closer);

//     let saver=await FactoryLogic.ReservationController().saveReservation();
//     console.log(saver);


// }

// registerReservation().then(

// )


//  ONLINE


// let registerReservation=async()=>
// {
//     let start=await FactoryLogic.ReservationController().startReservation();
//     console.log(start);


//     let regdetailr=await FactoryLogic.ReservationController().registerOnlineReservationDetail(4);
//     console.log(regdetailr);

//     let objreservation= FactoryLogic.ReservationController().getReservationinProgress();
//     console.log(objreservation);
//     // let regdetailr1=await FactoryLogic.ReservationController().registerOnlineReservationDetail(2);
//     // console.log(regdetailr1);
//     // let regdetailr2=await FactoryLogic.ReservationController().registerOnlineReservationDetail(3);
//     // console.log(regdetailr2);
//     // let regdetailr6=await FactoryLogic.ReservationController().removeOnlineReservationDetail(3);
//     // console.log(regdetailr6);
//     let login=await FactoryLogic.PassengerController().loginPassenger("7898764","Passenger123");
//     console.log(login);
//     dtoreservation.idcardpassenger=login.idcard;
//     let closer=await FactoryLogic.ReservationController().closeOnlineReservation(dtoreservation);
//     console.log(closer);

//     let saver=await FactoryLogic.ReservationController().saveOnlineReservation();

//     console.log(saver);


// }

// registerReservation().then(

// )


// MAINTENANCE


// let removeRoomReservation=async()=>
// {
//       let getp=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName5");
//   console.log(getp);
//   let getspr=await FactoryLogic.ReservationController().getLReservationPassenger(getp.idcard)
//   console.log(getspr);
//     let getr=await FactoryLogic.ReservationController().getReservation(1);
//   console.log(getr);
//   let removerroom=await FactoryLogic.ReservationController().removeReservationRoom(getr.numberreservation,2);
//   console.log(removerroom)

// }

// removeRoomReservation().then(

// )


// let canceledr=async()=>
// {
//     let getp=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName5");
//   console.log(getp);
//   let getspr=await FactoryLogic.ReservationController().getLReservationPassenger(getp.idcard)
//   console.log(getspr);
//   let getr=await FactoryLogic.ReservationController().getReservation(1);
//   console.log(getr);
//   let canceledr=await FactoryLogic.ReservationController().cancelReservation(getr.numberreservation);
//   console.log(canceledr);

// }
// canceledr().then(

// );
// let confirmr=async()=>
// {
//     let getp=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName5");
//   console.log(getp);
//   let getspr=await FactoryLogic.ReservationController().getLReservationPassenger(getp.idcard)
//   console.log(getspr);
//   let getr=await FactoryLogic.ReservationController().getReservation(2);
//   console.log(getr);

//   let confirmr=await FactoryLogic.ReservationController().confirmReservation(getr.numberreservation);
//   console.log(confirmr);

// }
// confirmr().then(

// );

// let addroomreservation=async()=>
// {
//   dtoreservation.listDetailReservation.push(new DTOReservationDetail(0,50,5));
//     let getp=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName4");
//   console.log(getp);

//   let getadd=await FactoryLogic.ReservationController().addReservationDetail(5,2);
//   console.log(getadd);

// }

// addroomreservation().then(

// )

// let getPendingPassenger=async()=>
// {

//   let getppr=await FactoryLogic.ReservationController().getLPendingPassenger("7898764");
//   console.log(getppr);

// }


// getPendingPassenger().then(

// )

// let getReservationbyDates=async()=>
// {

//   let getppr=await FactoryLogic.ReservationController().getLRbyDate(new Date("September 16, 2021"),new Date("December 7, 2021"));
//   console.log(getppr);

// }

// getReservationbyDates().then(

// )

// let getReservationbyroom=async()=>
// {

//   let getppr=await FactoryLogic.ReservationController().getByRoom(2);
//   console.log(getppr);

// }

// getReservationbyroom().then(

// )
// // **************************** PASSENGER SERVICES MAINTENANCE  ******************************************* */

// let addservicepassanger=async()=>
// {

//   let sps=await FactoryLogic.PassengerServiceController().startPS();
//   console.log(sps);
//   let rdps=await FactoryLogic.PassengerServiceController().registerDPS(1);
//   console.log(rdps);
//   let rdps2=await FactoryLogic.PassengerServiceController().registerDPS(5);
//   console.log(rdps2);
//   let rmdps2=await FactoryLogic.PassengerServiceController().removeDPS(5);
//   console.log(rmdps2);
//   let closeps=await FactoryLogic.PassengerServiceController().closePS(dtopassengerservice);
//   console.log(closeps);
//   let saveps=await FactoryLogic.PassengerServiceController().savePS();
//   console.log(saveps);

// }
// addservicepassanger().then(

// )

// let addnewservice=async()=>
// {


//   dtopassengerservice.listdetailps.push(new DTODPassengerService(0,6,200));
//     let getpname=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName4");
//   console.log(getpname);

//   let getp=await FactoryLogic.PassengerServiceController().enterPassenger(getpname.idcard);
//   console.log(getp);
//   let addps=await FactoryLogic.PassengerServiceController().addDPS(dtopassengerservice);
//   console.log(addps);

// }
// addnewservice().then(

// )
// let getPassengerService=async()=>
// {

//      let getpname=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName4");
//     console.log(getpname);
//       let getspr=await FactoryLogic.PassengerServiceController().getPSbyPassenger(getpname.idcard);
//   console.log(getspr);
//     let getps=await FactoryLogic.PassengerServiceController().getPS(getspr.numberps);
//    console.log(getps);

// }
// getPassengerService().then(

// )

// ********************************** PAYMENT MAINTENANCE ******************************* */

// let registerPayment=async()=>
// {

//   let datepay=new Date("October 20, 2021");
//      let getreservations=await FactoryLogic.PaymentController().enterPassenger("456456546");
//     console.log(getreservations);
//     let getres=await FactoryLogic.PaymentController().enterReservationsService(1);
//     console.log(getres);
//       let getclosep=await FactoryLogic.PaymentController().closePayment(200,datepay);
//     console.log(getclosep);
//     let result=await FactoryLogic.PaymentController().savePayment();
//    console.log(result);

// }
// registerPayment().then(

// )


// let getPayment=async()=>
// {

//        let getpname=await FactoryLogic.PassengerController().getLPassengerbyname("d","PassengerLastName4");
//     console.log(getpname);
//       let getpay=await FactoryLogic.PaymentController().getLPaymentPassenger(getpname.idcard);
//     console.log(getpay);


// }
// getPayment().then(

// )











// ****************************************************************************** */
// ADD MANY PASSENGER

// let dtpassenger1=new DTOPassenger("2456465",
// "Passenger1","PassengerLastName1","Country1","Town1","Address1",
// "056464554664","mailpassenger1@gmail.com",
// "","Passenger12","");

// let dtpassenger2=new DTOPassenger("7898764",
// "Passenger2","PassengerLastName2","Country2","Town2","Address2",
// "054645645","mailpassenger2@gmail.com",
// "","Passenger123","");
// let dtpassenger3=new DTOPassenger("45678673",
// "Passenger3","PassengerLastName3","Country3","Town3","Address3",
// "01234564","mailpassenger3@gmail.com",
// "","Passenger1234","");
// let dtpassenger4=new DTOPassenger("456456546",
// "Passenger4","PassengerLastName4","Country4","Town4","Address4",
// "0798575654","mailpassenger4@gmail.com",
// "","Passenger12345","");
// let dtpassenger5=new DTOPassenger("45678622",
// "Passenger5","PassengerLastName5","Country5","Town5","Address5",
// "07878945654","mailpassenger5@gmail.com",
// "","Passenger123456","");

// let arraypassenger=[];
// arraypassenger.push(dtpassenger1);
// arraypassenger.push(dtpassenger2);
// arraypassenger.push(dtpassenger3);
// arraypassenger.push(dtpassenger4);
// arraypassenger.push(dtpassenger5);

// let addmanypassenger=async()=>
// {
//   for(let p of arraypassenger)
//   {
//     let addp=await FactoryLogic.PassengerController().registerPassenger(p);
//     console.log(addp);
//   }
// }

// addmanypassenger().then(

// )
// //****************************************************************** */
// ADD MANY ROOMS

// let dtoroom1=new DTORoom(85,
//   "Individual","Individual",
//   "Accomodation1","Description1",50.55,"Active","img6.jpg");
//   let dtoroom2=new DTORoom(85,
//     "Double","Double",
//     "Accomodation2","Description2",70.55,"Active","img5.jpg");
//     let dtoroom3=new DTORoom(85,
//       "Triple","Queen Size",
//       "Accomodation3","Description3",90.55,"Active","img7.jpg");
//   let dtoroom4=new DTORoom(85,
//         "Bedroom","Double",
//         "Accomodation4","Description4",110.55,"Active","img8.jpg");
//  let arrayrooms=[];
//  arrayrooms.push(dtoroom1);
//  arrayrooms.push(dtoroom2);
//  arrayrooms.push(dtoroom3);
//  arrayrooms.push(dtoroom4);
//    let addmanyrooms=async()=>
//         {
//      for(let r of arrayrooms)
//        {
//          let addr=await FactoryLogic.RoomController().registerRoom(r);
//          console.log(addr);
//        }
//      }

//      addmanyrooms().then(

//         )

// ********************************************************************** */
// ADD MANY SERVICES

// let dtoservice1=new DTOService(85,"Service1",9.10);
// let dtoservice2=new DTOService(85,"Service2",8.10);
// let dtoservice3=new DTOService(85,"Service3",10.10);
// let dtoservice4=new DTOService(85,"Service4",11.10);
// let dtoservice5=new DTOService(85,"Service5",12.10);
// let dtoservice6=new DTOService(85,"Service6",8.50);

//  let arrays=[];

//  arrays.push(dtoservice1);
//  arrays.push(dtoservice2);
//  arrays.push(dtoservice3);
//  arrays.push(dtoservice4);
//  arrays.push(dtoservice5);
//  arrays.push(dtoservice6);

//   let addmanyservices=async()=>
//         {
//      for(let r of arrays)
//        {
//          let addr=await FactoryLogic.ServiceController().registerService(r);
//          console.log(addr);
//        }
//      }

//    addmanyservices().then(

//   )
//#endregion
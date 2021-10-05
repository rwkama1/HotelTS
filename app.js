

const {FactoryLogic}=require("./Hotel/dist/logic/FactoryLogic");
const { default: DTOPassenger } = require("./Hotel/dist/shared/entity/DTOPassenger");
const { default: DTORoom } = require("./Hotel/dist/shared/entity/DTORoom");
const { default: DTOService } = require("./Hotel/dist/shared/entity/DTOService");
const { default: DTOUser } = require("./Hotel/dist/shared/entity/DTOUser");
const { default: DTOReservation } = require("./Hotel/dist/shared/entity/DTOReservation");
const { default: DTOReservationDetail } = require("./Hotel/dist/shared/entity/DTOReservationDetail");
const { default: DTOPassengerService } = require("./Hotel/dist/shared/entity/DTOPassengerService");
const { default: DTODPassengerService } = require("./Hotel/dist/shared/entity/DTODPassengerService");


let dtuser=new DTOUser("75456546",
"ksdgsdgsdg","User1","Adress3",
"79789797","Administrator",
"Password12345","","mail2@gmail.com","");

let dtpassenger=new DTOPassenger("6789798",
"qwrfas","User1","USA","New York","Address",
"79789797","mailpassenger@gmail.com",
"","Password12345","");


// let dtoroom=new DTORoom(7,
//   "dfhdfh","dfshdfh",
//   "safasf","asgagasgasgasgasasg",50.55,"Active","asd.jpg");

// let dtoservice=new DTOService(2,"Service2",9.10);

let dtoreservation=new DTOReservation(0,"September 17, 2021", new Date("October 17, 2021"),
 new Date("November 17, 2021"),"Confirmed","Confirmed","Hotel",546,"6789798",[]);


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
//     let enterp=await FactoryLogic.ReservationController().enterPassenger("6789798");
//     console.log(enterp);
//     if(enterp===false)
//     {
//     let p=await FactoryLogic.ReservationController().registerPassenger(dtpassenger);
//      console.log(p);
//     }
//     let listreservation= await FactoryLogic.RoomController().getLActiveSortRooms();
//     console.log(listreservation);
   
//     let regdetailr=await FactoryLogic.ReservationController().registerReservationDetail(1);
//     console.log(regdetailr);
//     let regdetailr1=await FactoryLogic.ReservationController().registerReservationDetail(2);
//     console.log(regdetailr1);
//     let regdetailr6=await FactoryLogic.ReservationController().removeReservationDetail(3);
//     console.log(regdetailr6);
   
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
//   dtoreservation.listDetailReservation.push(new DTOReservationDetail(0,50,7));
//   let getp=await FactoryLogic.ReservationController().addReservationDetail(dtoreservation);
//   console.log(dtoreservation);
  
// }

// addroomreservation().then(

// )
// let getPendingPassenger=async()=>
// {

//   let getppr=await FactoryLogic.ReservationController().getLPendingPassenger("45678622");
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

//   let getppr=await FactoryLogic.ReservationController().getByRoom(7);
//   console.log(getppr);
  
// }

// getReservationbyroom().then(

// )
// **************************** PASSENGER SERVICES MAINTENANCE  ******************************************* */

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


//   dtopassengerservice.listdetailps.push(new DTODPassengerService(0,3,200));
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
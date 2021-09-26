
const {FactoryData}=require("./Hotel/dist/data/FactoryData");
const {FactoryLogic}=require("./Hotel/dist/logic/FactoryLogic");
const { default: DTOPassenger } = require("./Hotel/dist/shared/entity/DTOPassenger");
const { default: DTORoom } = require("./Hotel/dist/shared/entity/DTORoom");
const { default: DTOService } = require("./Hotel/dist/shared/entity/DTOService");
const { default: DTOUser } = require("./Hotel/dist/shared/entity/DTOUser");
const { default: DTOReservation } = require("./Hotel/dist/shared/entity/DTOReservation");
const { default: DTOReservationDetail } = require("./Hotel/dist/shared/entity/DTOReservationDetail");
const { default: LRegisterHotelReservation } = require("./Hotel/dist/logic/class/reservation_maintenance/maintenance/LRegisterHotelReservation");

let dtuser=new DTOUser("8545654654",
"ksdgsdgsdg","User1","Adress3",
"79789797","Administrator",
"Password12345","","mail2@gmail.com","");

let dtpassenger=new DTOPassenger("6789798",
"qwrfas","User1","USA","New York","Address",
"79789797","mailpassenger@gmail.com",
"","Password12345","");


let dtoroom=new DTORoom(3,
  "dfhdfh","dfshdfh",
  "safasf","asgagasgasgasgasasg",50.55,"Active","asd.jpg");

let dtoservice=new DTOService(2,"Service2",9.10);

let dtodetailreservation=new DTOReservationDetail(1,50,1);
let dtodetailreservation1=new DTOReservationDetail(2,40,1);
let dtodetailreservation2=new DTOReservationDetail(3,60,1);

let arraydetailreservation=[];
arraydetailreservation.push(dtodetailreservation);
arraydetailreservation.push(dtodetailreservation1);
arraydetailreservation.push(dtodetailreservation2);

let dtoreservation=new DTOReservation(0,"December17, 2020","December 17, 2020",
"December 17, 2020","Confirmed","Confirmed","Hotel",546,"6789798",arraydetailreservation)

//*********************************** USER MAINTENACE **************** */

// FactoryLogic.UserController().registerUser(dtuser).then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().updateUser(dtuser).then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().inactivateUser(dtuser).then(data => {
//     console.log(data);
// });
// FactoryLogic.UserController().getUser("5879789798").then(data => {
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
//     let login=await FactoryLogic.UserController().loginUser("8545654654","Password1234");
//     console.log(login);

//     let logout= FactoryLogic.UserController().logout();
//     console.log(logout);
//     let userlogin= FactoryLogic.UserController().getloginUser();
//     console.log(userlogin);
// }
// autenticationuser().then(

// )

  //******************************* PASSENGER MAINTENACE ****************************** */

// FactoryLogic.PassengerController().registerPassenger(dtpassenger).then(data => {
//     console.log(data);
// });
// FactoryLogic.PassengerController().updatePassanger(dtpassenger).then(data => {
//   console.log(data);
// });
// FactoryLogic.PassengerController().inactivatePassanger(dtpassenger).then(data => {
//   console.log(data);
// });
// FactoryLogic.PassengerController().getPassanger("67897988").then(data => {
//     console.log(data);
// });
// FactoryLogic.PassengerController().getPasangers().then(data => {
//     console.log(data);
// });
// FactoryLogic.PassengerController().getLActiveSortPassengers().then(data => {
//     console.log(data);
// });
// let autenticationpassenger=async()=>
// {
//     let login=await FactoryLogic.PassengerController().loginPassenger("85456574654","Password12345");
//     console.log(login);
//     let logout= FactoryLogic.PassengerController().logout();
//     console.log(logout);
//     let userlogin= FactoryLogic.PassengerController().getloginPassenger();
//     console.log(userlogin);
// }
// autenticationpassenger().then(

// )
//****************************  ROOM MAINTENANCE ************************************* */

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

//**************************** SERVICE MAINTENANCE ****************************************************** */

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

//******************************* RESERVATION MAINTENANCE ************************ */
// HOTEL

let registerReservation=async()=>
{
    let enterp=await FactoryLogic.ReservationController().enterPassenger("6789798");
    console.log(enterp);
    if(enterp===false)
    {
    let p=await FactoryLogic.ReservationController().registerPassenger(dtpassenger);
     console.log(p);
    }
    let objreservation= LRegisterHotelReservation.getInstance().objreservation;
    console.log(objreservation);
    let regdetailr=await FactoryLogic.ReservationController().registerReservationDetail(1);
    console.log(regdetailr);
    let regdetailr1=await FactoryLogic.ReservationController().registerReservationDetail(2);
    console.log(regdetailr1);
    let regdetailr2=await FactoryLogic.ReservationController().registerReservationDetail(3);
    console.log(regdetailr2);
    // let regdetailr6=await FactoryLogic.ReservationController().removeReservationDetail(3);
    // console.log(regdetailr6);
   
    let closer=await FactoryLogic.ReservationController().closeReservation();
    console.log(closer);
    let objreservation1= LRegisterHotelReservation.getInstance().objreservation;
    console.log(objreservation1);
    let saver=await FactoryLogic.ReservationController().saveReservation
    (dtoreservation.reservationdate,dtoreservation.arrivaldate,dtoreservation.departuredate);
    console.log(saver);
   
  
}

registerReservation().then(

)

//****************************************************************************** */
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
// let dtoroom1=new DTORoom(3,
//   "Individual","Individual",
//   "Accomodation1","Description1",50.55,"Active","img.jpg");
//   let dtoroom2=new DTORoom(3,
//     "Double","Double",
//     "Accomodation2","Description2",70.55,"Active","img1.jpg");
//     let dtoroom3=new DTORoom(3,
//       "Triple","Queen Size",
//       "Accomodation3","Description3",90.55,"Active","img2.jpg");
//   let dtoroom4=new DTORoom(3,
//         "Bedroom","Double",
//         "Accomodation4","Description4",110.55,"Active","img3.jpg");
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

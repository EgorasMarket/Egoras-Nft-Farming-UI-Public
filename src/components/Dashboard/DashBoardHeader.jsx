// import React, { useState, useEffect } from "react";
// import {
//   NotificationsNone,
//   Language,
//   Settings,
//   ThumbUpAltIcon,
// } from "@material-ui/icons";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
// import ListAltIcon from "@material-ui/icons/ListAlt";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// import "../../css/dashboardheader.css";

// const DashBoardHeader = () => {
//   const [click, setClick] = useState('drop');

//   const changeOnclick = () => {

//     if (click === 'drop') {
//   setClick=()=>('notdrop')
// }

//   };

//   return (
//     <div>
//       {/* header section  start*/}
//       <section className="DashBoardHeaderSection">
//         <div className="DashboardHeaderArea">
//           <div className="DashboardHeaderLogo">
//             {" "}
//             <img src="/img/egoras-logo.svg" alt="..." className="egr-logo" />
//           </div>
//           <div className="DashboardHeaderLinks">
//             <a href="#" className="onlineSupport">
//               Online Support
//             </a>
//             <a href="#" className="bankCall">
//               Bank Call
//             </a>
//           </div>
//           <div className="header-icons">
//             <div className="topbarIconContainer">
//               <Settings />
//             </div>
//           </div>
//           <div
//             className="DashboardHeaderImage"
//             style={{
//               backgroundImage: "url(/img/profilepic.jpg)",
//               height: "40px",
//               width: "40px",
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "cover",
//               borderRadius: "100px",
//               boxShadow: "0px 0px 10px #c3c3c3",
//               backgroundPosition: "center",
//               position: "relative",
//             }}
//           >

//             <div className="profileDropDown">
//               <div className="dropdownarea1">
//                 <AccountCircleIcon /> My Profile
//               </div>
//               <hr></hr>
//               <div className="dropdownarea1">
//                 <ListAltIcon /> My Tasks
//               </div>
//               <hr></hr>
//               <div className="dropdownarea1">
//                 <MoveToInboxIcon /> My Inbox
//               </div>
//               <hr></hr>
//               <div className="dropdownarea1">
//                 <ExitToAppIcon /> Logout
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* header section  end*/}
//       {/* =================================================== */}
//       {/* =================================================== */}
//       {/* =================================================== */}
//     </div>
//   );
// };

// export default DashBoardHeader;

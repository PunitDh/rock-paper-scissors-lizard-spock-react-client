// import img1 from "../assets/images/profile/user-1.jpg";
// import img2 from "../assets/images/profile/user-2.jpg";
// import img3 from "../assets/images/profile/user-3.jpg";
// import img4 from "../assets/images/profile/user-4.jpg";
import astronaut from "../assets/images/profile/astronaut.png";
import bear from "../assets/images/profile/bear.png";
import cat from "../assets/images/profile/cat.png";
import dog from "../assets/images/profile/dog.png";
import hacker from "../assets/images/profile/hacker.png";
import happyMan from "../assets/images/profile/happy-man.png";
import manWinking from "../assets/images/profile/man-winking.png";
import man from "../assets/images/profile/man.png";
import panda from "../assets/images/profile/panda.png";
import prideFemale from "../assets/images/profile/pride-female.png";
import rabbit from "../assets/images/profile/rabbit.png";
import user1 from "../assets/images/profile/user-1.jpg";
import winkingFemale from "../assets/images/profile/winking-female.png";
import woman from "../assets/images/profile/woman.png";

import { IconTypography } from "@tabler/icons";
import { uniqueId } from "lodash";

// import icon1 from "../assets/images/svgs/icon-account.svg";
// import icon2 from "../assets/images/svgs/icon-inbox.svg";
// import icon3 from "../assets/images/svgs/icon-tasks.svg";

// import ddIcon1 from "../assets/images/svgs/icon-dd-chat.svg";
// import ddIcon2 from "../assets/images/svgs/icon-dd-cart.svg";
// import ddIcon3 from "../assets/images/svgs/icon-dd-invoice.svg";
// import ddIcon4 from "../assets/images/svgs/icon-dd-date.svg";
// import ddIcon5 from "../assets/images/svgs/icon-dd-mobile.svg";
// import ddIcon6 from "../assets/images/svgs/icon-dd-lifebuoy.svg";
// import ddIcon7 from "../assets/images/svgs/icon-dd-message-box.svg";
// import ddIcon8 from "../assets/images/svgs/icon-dd-application.svg";
// import { uniqueId } from "lodash";
// import { IconTypography } from "@tabler/icons";

// //
// // Notifications dropdown
// //
// const notifications = [
//   {
//     avatar: img1,
//     title: "Roman Joined the Team!",
//     subtitle: "Congratulate him",
//   },
//   {
//     avatar: img2,
//     title: "New message received",
//     subtitle: "Salma sent you new message",
//   },
//   {
//     avatar: img3,
//     title: "New Payment received",
//     subtitle: "Check your earnings",
//   },
//   {
//     avatar: img4,
//     title: "Jolly completed tasks",
//     subtitle: "Assign her new tasks",
//   },
//   {
//     avatar: img1,
//     title: "Roman Joined the Team!",
//     subtitle: "Congratulate him",
//   },
//   {
//     avatar: img2,
//     title: "New message received",
//     subtitle: "Salma sent you new message",
//   },
//   {
//     avatar: img3,
//     title: "New Payment received",
//     subtitle: "Check your earnings",
//   },
//   {
//     avatar: img4,
//     title: "Jolly completed tasks",
//     subtitle: "Assign her new tasks",
//   },
// ];

// //
// // Profile dropdown
// //
// const profile = [
//   {
//     href: "/user-profile",
//     title: "My Profile",
//     subtitle: "Account Settings",
//     icon: icon1,
//   },
//   {
//     href: "/apps/email",
//     title: "My Inbox",
//     subtitle: "Messages & Emails",
//     icon: icon2,
//   },
//   {
//     href: "/apps/notes",
//     title: "My Tasks",
//     subtitle: "To-do and Daily Tasks",
//     icon: icon3,
//   },
// ];

// // apps dropdown

// const appsLink = [
//   {
//     href: "/apps/chats",
//     title: "Chat Application",
//     subtext: "Messages & Emails",
//     avatar: ddIcon1,
//   },
//   {
//     href: "/apps/ecommerce/shop",
//     title: "eCommerce App",
//     subtext: "Messages & Emails",
//     avatar: ddIcon2,
//   },
//   {
//     href: "/",
//     title: "Invoice App",
//     subtext: "Messages & Emails",
//     avatar: ddIcon3,
//   },
//   {
//     href: "/apps/calendar",
//     title: "Calendar App",
//     subtext: "Messages & Emails",
//     avatar: ddIcon4,
//   },
//   {
//     href: "/apps/contacts",
//     title: "Contact Application",
//     subtext: "Account settings",
//     avatar: ddIcon5,
//   },
//   {
//     href: "/apps/tickets",
//     title: "Tickets App",
//     subtext: "Account settings",
//     avatar: ddIcon6,
//   },
//   {
//     href: "/apps/email",
//     title: "Email App",
//     subtext: "To-do and Daily tasks",
//     avatar: ddIcon7,
//   },
//   {
//     href: "/",
//     title: "Kanban Application",
//     subtext: "To-do and Daily tasks",
//     avatar: ddIcon8,
//   },
// ];

// const pageLinks = [
//   {
//     href: "/pricing",
//     title: "Pricing Page",
//   },
//   {
//     href: "/auth/login",
//     title: "Authentication Design",
//   },
//   {
//     href: "/auth/register",
//     title: "Register Now",
//   },
//   {
//     href: "/404",
//     title: "404 Error Page",
//   },
//   {
//     href: "/apps/notes",
//     title: "Notes App",
//   },
//   {
//     href: "/user-profile",
//     title: "User Application",
//   },
//   {
//     href: "/apps/blog/posts",
//     title: "Blog Design",
//   },
//   {
//     href: "/apps/ecommerce/eco-checkout",
//     title: "Shopping Cart",
//   },
// ];

const avatars = [
  { id: 1, image: astronaut, name: "Astronaut" },
  { id: 2, image: bear, name: "Bear" },
  { id: 3, image: cat, name: "Cat" },
  { id: 4, image: dog, name: "Dog" },
  { id: 5, image: hacker, name: "Hacker" },
  { id: 6, image: happyMan, name: "Happy Man" },
  { id: 7, image: manWinking, name: "Winking Man" },
  { id: 8, image: man, name: "Man" },
  { id: 9, image: panda, name: "Panda" },
  { id: 10, image: prideFemale, name: "Pride Woman" },
  { id: 11, image: rabbit, name: "Rabbit" },
  { id: 12, image: user1, name: "User1" },
  { id: 13, image: winkingFemale, name: "Winking Woman" },
  { id: 14, image: woman, name: "Woman" },
];

const entities = [
  { color: "brown", name: "Rock" },
  { color: "gray", name: "Paper" },
  { color: "silver", name: "Scissors" },
  { color: "green", name: "Lizard" },
  { color: "blue", name: "Spock" },
];

const currentGames = [
  {
    id: uniqueId(),
    title: "Game 1",
    icon: IconTypography,
    href: "/game/1",
    gameContext: true,
  },
];

export { currentGames, avatars, entities };

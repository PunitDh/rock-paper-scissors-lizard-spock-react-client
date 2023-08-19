import {
  IconAbacus,
  IconAtom,
  IconAtom2,
  IconBallBaseball,
  IconBallBasketball,
  IconBallBowling,
  IconBallFootball,
  IconBallTennis,
  IconBallVolleyball,
  IconChess,
  IconChessBishop,
  IconChessKing,
  IconChessKnight,
  IconChessQueen,
  IconChessRook,
  IconGoGame,
  IconTrophy,
} from "@tabler/icons";
import astronaut from "./images/profile/astronaut.png";
import bear from "./images/profile/bear.png";
import cat from "./images/profile/cat.png";
import dog from "./images/profile/dog.png";
import hacker from "./images/profile/hacker.png";
import happyMan from "./images/profile/happy-man.png";
import manWinking from "./images/profile/man-winking.png";
import man from "./images/profile/man.png";
import panda from "./images/profile/panda.png";
import prideFemale from "./images/profile/pride-female.png";
import rabbit from "./images/profile/rabbit.png";
import user1 from "./images/profile/user-1.jpg";
import winkingFemale from "./images/profile/winking-female.png";
import woman from "./images/profile/woman.png";
import rock from "./images/entities/rock.png";
import paper from "./images/entities/paper.png";
import scissors from "./images/entities/scissors.png";
import lizard from "./images/entities/lizard.png";
import spock from "./images/entities/spock.png";
import ErrorImg from "./images/backgrounds/404-error-idea.gif";
import Product1 from "./images/products/s4.jpg";
import Product2 from "./images/products/s5.jpg";
import Product3 from "./images/products/s7.jpg";
import Product4 from "./images/products/s11.jpg";
import ProfileImg from "./images/profile/user-1.jpg";
import LogoImage from "./images/logos/logo.png";

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

const getAvatar = (id) => avatars.find((it) => it.id === id)?.image;

const icons = [
  { id: 1, icon: IconChess },
  { id: 2, icon: IconGoGame },
  { id: 3, icon: IconTrophy },
  { id: 4, icon: IconAbacus },
  { id: 5, icon: IconChessBishop },
  { id: 6, icon: IconAtom2 },
  { id: 7, icon: IconAtom },
  { id: 8, icon: IconChessKing },
  { id: 9, icon: IconChessKnight },
  { id: 10, icon: IconChessQueen },
  { id: 11, icon: IconChessRook },
  { id: 12, icon: IconBallBaseball },
  { id: 13, icon: IconBallBasketball },
  { id: 14, icon: IconBallBowling },
  { id: 15, icon: IconBallFootball },
  { id: 16, icon: IconBallTennis },
  { id: 17, icon: IconBallVolleyball },
];

const getIcon = (id) => icons.find((it) => it.id === id);

const entities = [
  { color: "brown", name: "Rock", image: rock },
  { color: "gray", name: "Paper", image: paper },
  { color: "silver", name: "Scissors", image: scissors },
  { color: "green", name: "Lizard", image: lizard },
  { color: "blue", name: "Spock", image: spock },
];

const languages = [
  "Arabic",
  "Bengali",
  "Chinese (Mandarin)",
  "English",
  "French",
  "German",
  "Greek",
  "Hindi",
  "Italian",
  "Japanese",
  "Javanese",
  "Korean",
  "Malay",
  "Marathi",
  "Portuguese",
  "Punjabi",
  "Russian",
  "Spanish",
  "Swahili",
  "Tamil",
  "Telugu",
  "Turkish",
  "Urdu",
  "Vietnamese",
];

export {
  avatars,
  getAvatar,
  icons,
  getIcon,
  entities,
  ErrorImg,
  Product1,
  Product2,
  Product3,
  Product4,
  ProfileImg,
  LogoImage,
  languages
};

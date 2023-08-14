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
import rock from "../assets/images/entities/rock.png";
import paper from "../assets/images/entities/paper.png";
import scissors from "../assets/images/entities/scissors.png";
import lizard from "../assets/images/entities/lizard.png";
import spock from "../assets/images/entities/spock.png";

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

const getAvatar = (id) => avatars.find((it) => it.id === id);

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

export { avatars, getAvatar, icons, getIcon, entities };

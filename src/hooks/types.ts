export type Clipboard = {
  get: () => Promise<string | undefined>;
  copy: (text: string) => void;
};

interface API {}

export type Token = {
  jwt?: string;
  decoded?: Decoded;
  set?: (token: string) => void;
  clear?: () => void;
};

export type Decoded = {
  avatar: number;
  email: string;
  exp: number;
  firstName: string;
  hidden: boolean;
  iat: number;
  id: string;
  isAdmin: boolean;
  isOnline: boolean;
  lastName: string;
  losses: number;
  wins: number;
};

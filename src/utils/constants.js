export const NotificationType = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
});

export const SocketRequest = Object.freeze({
  LOGIN_USER: "login-user",
  REGISTER_USER: "register-user",
  UPDATE_PROFILE: "update-profile",
  UPDATE_PASSWORD: "update-password",
  DELETE_PROFILE: "delete-profile",
  PLAY_MOVE: "play-move",
  LOAD_CURRENT_GAMES: "get-current-games",
  LOAD_CURRENT_GAME: "load-game",
  LOAD_CURRENT_USERS: "get-current-users",
  LOAD_RECENT_GAMES: "get-recent-games",
  RENAME_GAME: "rename-game",
  CHANGE_ICON: "change-icon",
  RESET_GAME_ROUNDS: "reset-rounds",
  CREATE_GAME: "create-game",
  CLOSE_GAME: "close-game",
});

export const SocketResponse = Object.freeze({
  USER_LOGGED_IN: "user-logged-in",
  USER_REGISTERED: "user-registered",
  PROFILE_UPDATED: "profile-updated",
  PROFILE_DELETED: "profile-deleted",
  MOVE_PLAYED: "move-played",
  CURRENT_GAMES_LOADED: "current-games",
  CURRENT_GAME_LOADED: "game-loaded",
  CURRENT_USERS_LOADED: "current-users",
  RECENT_GAMES_LOADED: "recent-games",
  GAME_RENAMED: "game-renamed",
  ICON_CHANGED: "icon-changed",
  GAME_ROUNDS_RESET: "rounds-reset",
  GAME_CREATED: "game-created",
  GAME_CLOSED: "game-closed",
});

export const tokenKey = "rpsls-token";
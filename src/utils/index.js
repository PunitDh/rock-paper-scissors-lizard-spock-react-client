import { IconTypography } from "@tabler/icons";
import { uniqueId } from "lodash";

export const Status = {
  SUCCESS: "success",
  ERROR: "error",
  UNAUTHORIZED: "unauthorized",
};

export function isSuccess(response) {
  return new Promise((resolve, reject) => {
    return response.status === Status.SUCCESS
      ? resolve(response.payload)
      : reject(response.payload);
  });
}

export function gameToNavItemMapper(game) {
  return {
    id: uniqueId(),
    title: game.name,
    icon: IconTypography,
    href: `/games/${game.id}`,
    gameContext: true,
  };
}

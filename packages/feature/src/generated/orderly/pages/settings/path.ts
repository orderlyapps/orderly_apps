import { PATHS } from "../../paths";

export type Param = string | undefined | null;

export const path = (param?: Param) => {
  if (param) return `${ PATHS.settings }/${param}`;
  return PATHS.settings;
};

// generated
export type Param = string | undefined | null;

/**
 * Generate a path string based on the given `paths` object and `page` key.
 *
 * If `param` is provided, it will be appended to the path.
 *
 * @param paths - Object containing path mappings
 * @param page - Key to access the specific path
 * @param param - Optional parameter to append to the path
 * @returns The generated path string
 *
 * @example
 * path({ home: '/' }, 'home') // /
 * path({ home: '/' }, 'home', '123') // /123
 */
export const path = (
  paths: { [key: string]: string },
  page: string,
  param?: Param,
  query?: Param
) => {
  if (param) return `${paths[page]}/${param}`;
  if (query) return `${paths[page]}/new`;
  return paths[page];
};

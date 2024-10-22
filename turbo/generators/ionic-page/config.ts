import { PlopTypes } from "@turbo/gen";
import {
  apps,
  newGeneratedPageLinkPath,
  newGeneratedPagesPath,
  tabs,
} from "../settings";

const linkTypes = ["item", "button", "card", "fab button"];

const createPage = {
  type: "add",
  path: `${newGeneratedPagesPath}{{kebabCase app}}/pages/{{kebabCase name}}/{{pascalCase name}}Page.tsx`,
  templateFile: "ionic-page/page.hbs",
};

const createPageLinks = linkTypes.map((type) => {
  return {
    type: "add",
    path: `${newGeneratedPageLinkPath}{{pascalCase name}}PageLink{{pascalCase type}}.tsx`,
    templateFile: "ionic-page/link.hbs",
    data: { type },
  };
});

const addPagePathFile = {
  type: "add",
  path: `${newGeneratedPageLinkPath}path.ts`,
  templateFile: "ionic-page/path.hbs",
};

const addPathToPATHSObject = {
  type: "append",
  path: `packages/components/page-links/src/{{kebabCase app}}/{{kebabCase app}}_PATHS.ts`,
  pattern: /PATHS = {(?<insertion>)/g,
  template: '\t{{snakeCase name}}: "/{{kebabCase tab}}/{{kebabCase name}}",',
};

const addPageLinkExports = {
  type: "append",
  path: `packages/components/page-links/package.json`,
  pattern: /"exports": {(?<insertion>)/g,
  template:
    '\t"./{{pascalCase name}}PageLinkItem": {\n' +
    '\t\t"types": "./src/orderly/{{kebabCase name}}/{{pascalCase name}}PageLinkItem.tsx",\n' +
    '\t\t"default": "./dist/orderly/{{kebabCase name}}/{{pascalCase name}}PageLinkItem.js"\n' +
    "\t},\n" +
    '\t"./{{pascalCase name}}PageLinkButton": {\n' +
    '\t\t"types": "./src/orderly/{{kebabCase name}}/{{pascalCase name}}PageLinkButton.tsx",\n' +
    '\t\t"default": "./dist/orderly/{{kebabCase name}}/{{pascalCase name}}PageLinkButton.js"\n' +
    "\t},\n" +
    '\t"./{{pascalCase name}}PageLinkCard": {\n' +
    '\t\t"types": "./src/orderly/{{kebabCase name}}/{{pascalCase name}}PageLinkCard.tsx",\n' +
    '\t\t"default": "./dist/orderly/{{kebabCase name}}/{{pascalCase name}}PageLinkCard.js"\n' +
    "\t},\n" +
    '\t"./{{pascalCase name}}PageLinkFabButton": {\n' +
    '\t\t"types": "./src/orderly/{{kebabCase name}}/{{pascalCase name}}PageLinkFabButton.tsx",\n' +
    '\t\t"default": "./dist/orderly/{{kebabCase name}}/{{pascalCase name}}PageLinkFabButton.js"\n' +
    "\t},",
};

const addRoute = {
  type: "append",
  path: `${newGeneratedPagesPath}{{kebabCase app}}/routes.ts`,
  pattern: /= \[(?<insertion>)/g,
  template:
    "  {\n" +
    "    path: {{ constantCase app }}_PATHS.{{ snakeCase name }},\n" +
    "    // tab: 'string',\n" +
    "    // icon: homeOutline,\n" +
    "    Component: lazy(\n" +
    "      () => import('./pages/{{kebabCase name}}/{{pascalCase name}}Page')\n" +
    "    ),\n" +
    "    // redirect: true\n" +
    "  },",
};

export const ionicPage = (plop: PlopTypes.NodePlopAPI) => {
  return plop.setGenerator("Ionic Page", {
    description: "Adds a new Ionic page",
    prompts: [
      {
        type: "list",
        name: "app",
        message: "Which app would you like to add the page to?",
        choices: apps,
      },
      {
        type: "list",
        name: "tab",
        message: "Which tab would you like to add the page to?",
        choices: tabs,
      },
      {
        type: "input",
        name: "name",
        message: "What would you like to name the page?",
      },
    ],
    actions: [
      createPage,
      ...createPageLinks,
      // addPagePathFile,
      addPathToPATHSObject,
      addPageLinkExports,
      addRoute,
    ],
  });
};

// {
//   type: "modify",
//   path: "apps/{{kebabCase app}}/src/app/generated/util/Routes.tsx",
//   pattern: /^(.*"react";)(.*\<\/Route>)/s,
//   template:
//     "$1 " +
//     '\nconst {{pascalCase name}}Page = lazy(() => import("../pages/{{kebabCase tab}}/{{pascalCase name}}Page"));' +
//     "$2" +
//     "\n\n      <Route exact path={ PATHS.{{kebabCase name}} }>\n" +
//     "        <Suspense fallback={<LoadingSpinner />}>\n" +
//     "          <{{pascalCase name}}Page />\n" +
//     "        </Suspense>\n" +
//     "      </Route>",
// },
// {
//   type: "modify",
//   path: "apps/{{kebabCase app}}/src/app/generated/util/paths.ts",
//   pattern: /^(.*\{)(.*)$/s,
//   template:
//     "$1" +
//     '\n\t{{kebabCase name}}: "/{{kebabCase tab}}/{{kebabCase name}}",' +
//     "$2",
// },

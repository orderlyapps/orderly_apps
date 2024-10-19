import { PlopTypes } from "@turbo/gen";
import { apps, newGeneratedPagesPath, tabs } from "../settings";

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
      {
        type: "add",
        path: `${newGeneratedPagesPath}{{kebabCase app}}/pages/{{kebabCase name}}/{{pascalCase name}}Page.tsx`,
        templateFile: "ionic-page/page.hbs",
      },

      // LINKS
      {
        type: "add",
        path: `${newGeneratedPagesPath}{{kebabCase app}}/pages/{{kebabCase name}}/{{pascalCase name}}PageLinkItem.tsx`,
        templateFile: "ionic-page/link.hbs",
        data: { type: "item" },
      },
      {
        type: "add",
        path: `${newGeneratedPagesPath}{{kebabCase app}}/pages/{{kebabCase name}}/{{pascalCase name}}PageLinkButton.tsx`,
        templateFile: "ionic-page/link.hbs",
        data: { type: "button" },
      },
      {
        type: "add",
        path: `${newGeneratedPagesPath}{{kebabCase app}}/pages/{{kebabCase name}}/{{pascalCase name}}PageLinkCard.tsx`,
        templateFile: "ionic-page/link.hbs",
        data: { type: "card" },
      },
      {
        type: "add",
        path: `${newGeneratedPagesPath}{{kebabCase app}}/pages/{{kebabCase name}}/{{pascalCase name}}PageLinkFabButton.tsx`,
        templateFile: "ionic-page/link.hbs",
        data: { type: "fab button" },
      },

      {
        type: "add",
        path: `${newGeneratedPagesPath}{{kebabCase app}}/pages/{{kebabCase name}}/path.ts`,
        templateFile: "ionic-page/path.hbs",
      },
      {
        type: "append",
        path: `${newGeneratedPagesPath}{{kebabCase app}}/paths.ts`,
        pattern: /PATHS = {(?<insertion>)/g,
        template:
          '\t{{snakeCase name}}: "/{{kebabCase tab}}/{{kebabCase name}}",',
      },
      {
        type: "append",
        path: `${newGeneratedPagesPath}{{kebabCase app}}/routes.ts`,
        pattern: /= \[(?<insertion>)/g,
        template:
          " {\n" +
          "   path: PATHS.{{ snakeCase name }},\n" +
          "   // tab: 'string',\n" +
          "   // icon: homeOutline,\n" +
          "   Component: lazy(\n" +
          "     () => import('./pages/{{kebabCase name}}/{{pascalCase name}}Page')\n" +
          "   ),\n" +
          "   // redirect: true\n" +
          " },",
      },
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
    ],
  });
};

import { PlopTypes } from "@turbo/gen";

export const ionicPage = (plop: PlopTypes.NodePlopAPI) => {
  return plop.setGenerator("Ionic Page", {
    description: "Adds a new Ionic page",
    prompts: [
      {
        type: "list",
        name: "app",
        message: "Which app would you like to add the page to?",
        choices: ["orderly"],
      },
      {
        type: "list",
        name: "tab",
        message: "Which tab would you like to add the page to?",
        choices: ["home", "settings"],
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of the page?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "apps/{{kebabCase app}}/src/app/generated/pages/{{kebabCase tab}}/{{pascalCase name}}Page.tsx",
        templateFile: "ionic-page/ionic-page.hbs",
      },
      {
        type: "add",
        path: "apps/{{kebabCase app}}/src/app/generated/page-links/{{kebabCase tab}}/{{pascalCase name}}PageLinks.tsx",
        templateFile: "ionic-page/ionic-page-links.hbs",
      },
      {
        type: "modify",
        path: "apps/{{kebabCase app}}/src/app/generated/util/Routes.tsx",
        pattern: /^(.*"react";)(.*\<\/Route>)/s,
        template:
          "$1 " +
          '\nconst {{pascalCase name}}Page = lazy(() => import("../pages/{{kebabCase tab}}/{{pascalCase name}}Page"));' +
          "$2" +
          "\n\n      <Route exact path={ PATHS.{{snakeCase name}} }>\n" +
          "        <Suspense fallback={<LoadingSpinner />}>\n" +
          "          <{{pascalCase name}}Page />\n" +
          "        </Suspense>\n" +
          "      </Route>",
      },
      {
        type: "modify",
        path: "apps/{{kebabCase app}}/src/app/generated/util/paths.ts",
        pattern: /^(.*\{)(.*)$/s,
        template:
          "$1" +
          '\n\t{{snakeCase name}}: "/{{kebabCase tab}}/{{kebabCase name}}",' +
          "$2",
      },
    ],
  });
};

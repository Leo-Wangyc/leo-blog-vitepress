import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "Leo's Blog",
  head: [
    [
      "link",
      { rel: "icon", type: "image/png", href: "/leo-blog-vitepress/boat.png" },
    ],
  ],
  description: "Leo's daily study",
  base: "/leo-blog-vitepress/",
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container
  },
  themeConfig: {
    logo: "/assets/boat.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "My Lair",
        items: [
          {
            text: "Portal",
            link: "/",
          },
          {
            text: "Development Log",
            link: "/documents/my-lair/workflow",
          },
        ],
      },
      {
        text: "Documents",
        items: [
          {
            text: "Computer Science",
            link: "/documents/computer-science/computer-science",
          },
          {
            text: "Economics",
            link: "/documents/economics/economics",
          },
          {
            text: "English",
            link: "/documents/english/word&lexis",
          },
          {
            text: "Music",
            link: "/documents/music/todo",
          },
          {
            text: "Arts",
            link: "/documents/arts/todo",
          },
        ],
      },
      {
        text: "Certificates",
        link: "/certificates/harvard-cs50p",
      },
      // {
      //   text: "Annual Summary",
      //   items: [
      //     {
      //       text: "Career Trajectory",
      //       link: "/annual-summary/career-trajectory",
      //     },
      //   ],
      // },
      {
        text: "Public",
        items: [
          {
            text: "CS50 Guidebook",
            link: "/share/cs50",
          },
        ],
      },
    ],

    sidebar: {
      "/documents/my-lair": [
        {
          text: "Development Log",
          items: [
            {
              text: "Total WorkFlow",
              link: "/documents/my-lair/workflow",
            },
            {
              text: "Preparation & Environment",
              link: "/documents/my-lair/step1-preparation",
            },
            {
              text: "Framework",
              link: "/documents/todo",
            },
            {
              text: "Core Development",
              link: "/documents/todo",
            },
            {
              text: "Test & CI/CD",
              link: "/documents/todo",
            },
          ],
        },
      ],
      "/documents/computer-science": [
        {
          text: "Computer Science",
          items: [
            {
              text: "Computer Architecture",
              link: "/documents/computer-science/computer-science",
            },
            {
              text: "Git",
              link: "/documents/computer-science/git",
            },
            {
              text: "Algorithm",
              link: "/documents/computer-science/algorithm",
            },
            {
              text: "C",
              collapsed: true,
              items: [
                {
                  text: "C Basic",
                  link: "/documents/computer-science/c/c",
                },
              ],
            },
            {
              text: "Game",
              collapsed: true,
              items: [
                {
                  text: "Cocos",
                  link: "/documents/computer-science/game/cocos",
                },
              ],
            },
            {
              text: "Front-end",
              collapsed: true,
              items: [
                {
                  text: "Front-end Theory",
                  link: "/documents/computer-science/front-end/front-end-theory",
                },
                {
                  text: "html",
                  link: "/documents/computer-science/front-end/html",
                },
                {
                  text: "CSS",
                  link: "/documents/computer-science/front-end/css",
                },
                {
                  text: "JS & ES6+",
                  link: "/documents/computer-science/front-end/js&es6+",
                },
                {
                  text: "Typescript",
                  link: "/documents/computer-science/front-end/typescript",
                },
                {
                  text: "Node",
                  link: "/documents/computer-science/front-end/node",
                },
                {
                  text: "Vue",
                  link: "/documents/computer-science/front-end/vue",
                },
                {
                  text: "Vite",
                  link: "/documents/computer-science/front-end/vite",
                },
                {
                  text: "React",
                  link: "/documents/computer-science/front-end/react",
                },
                {
                  text: "Next",
                  link: "/documents/computer-science/front-end/next",
                },
                {
                  text: "Mini App",
                  link: "/documents/computer-science/front-end/miniapp",
                },
                {
                  text: "Webpack",
                  link: "/documents/computer-science/front-end/webpack",
                },
                {
                  text: "Components Design",
                  link: "/documents/computer-science/front-end/component-design",
                },
                {
                  text: "Cloud Development",
                  link: "/documents/computer-science/front-end/cloud-development",
                },
                {
                  text: "Engineering",
                  link: "/documents/computer-science/front-end/project",
                },
                {
                  text: "Special",
                  link: "/documents/computer-science/front-end/special",
                },
              ],
            },
            {
              text: "Back-end",
              collapsed: true,
              items: [
                {
                  text: "Nest",
                  link: "/documents/computer-science/back-end/nest",
                },
              ],
            },
            {
              text: "Database",
              collapsed: true,
              items: [
                {
                  text: "MongoDB",
                  link: "/documents/computer-science/database/mongodb",
                },
              ],
            },
            {
              text: "Python",
              collapsed: true,
              items: [
                {
                  text: "Python Basic",
                  link: "/documents/computer-science/python/python-basic",
                },
              ],
            },
            {
              text: "HarmonyOS",
              collapsed: true,
              items: [
                {
                  text: "HarmonyOS Basic",
                  link: "/documents/computer-science/harmonyos/harmonyos",
                },
              ],
            },
            {
              text: "Vite Press",
              link: "/documents/computer-science/front-end/vite-press",
            },
          ],
        },
      ],
      "/documents/economics": [
        {
          text: "Economics",
          items: [
            {
              text: "Basic Economics",
              link: "/documents/economics/economics",
            },
          ],
        },
      ],
      "/documents/english": [
        {
          text: "English",
          items: [
            {
              text: "Words & Lexis",
              link: "/documents/english/word&lexis",
            },
            {
              text: "Grammar",
              link: "/documents/english/grammar",
            },
            {
              text: "Sentences",
              link: "/documents/english/sentences",
            },
            {
              text: "Verbal",
              link: "/documents/english/verbal",
            },
          ],
        },
      ],
      "/certificates/": [
        {
          text: "Certificates",
          items: [
            {
              text: "Harvard CS50P",
              link: "/certificates/harvard-cs50p",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    search: {
      provider: "local",
    },
  },
});

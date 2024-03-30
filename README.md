<h1 align="center">
    👽 Jupiter 🚀
</h1>

<p align="center">
    <em>
        "Roman god of the sky and thunder, and king of the gods."
    </em>
</p>

<h3 align="center">
    A monorepo for my configs, utilities, main projects, etc.
</h3>

## Installation

Please refer to the [workspaces](#workspaces) section for an overview of how this monorepo is structured.

### Projects that Use a Dependency in `packages`

Before running the `dev` command for the project, make sure that the package has been built. Every JS project in this monorepo has an "filter" script defined in the root `package.json`. The script should make running commands that target a specific package easier and less cumbersome to type.

For example, with the `@jupiter/ui-react` package:

```shell
pnpm @ui-react run build
# Or run in watch mode
pnpm @ui-react run build:watch
```

> [!TIP]
> Running the build in watch mode can help when working on a project using that package while making updates to that package.

Alternatively, the `@<project_name>:dev` script defined in the root `package.json` can be used to avoid need a terminal window open for each dev server.

For example, for the `www` project:

```shell
pnpm @www:dev
```

This command runs 2 sets of commands concurrently:
1. Builds the `@jupiter/ui-react` package, then runs the `www` project Vite dev server.
2. Re-runs the build script for `@jupiter/ui-react` package, but in watch mode.

> [!NOTE]
> It is possible to the build script for `@jupiter/ui-react` in watch mode first, then run the `www` project Vite dev server using the `--group` flag from the concurrently package. (meaning the initial build for `@jupiter/ui-react` could be skipped).
>
> However, when running that flag, the logs from the `www` were not shown in the terminal. Only the logs for `@jupiter/ui-react` were displayed, even though the Vite dev server was running as expected.

## Workspaces

### `apps` Directory

<table>
    <tr>
        <th>Project Name</th>
        <th>Tech Stack</th>
        <th>Description</th>
        <th>Link(s)</th>
    </tr>
    <tr>
        <td>
            <code>react-template</code>
        </td>
        <td>
            <p>
                <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
                <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
            </p>
            <p>
                <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
            </p>
        </td>
        <td>
            A template project to jump start a new React project.
        </td>
        <td>
            N/A
        </td>
    </tr>
    <tr>
        <td>
            <code>www</code>
        </td>
        <td>
            <p>
                <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
                <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
            </p>
            <p>
                <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
            </p>
        </td>
        <td>
            My personal website, written with React.
        </td>
        <td>
            <a href="https://rbondoc.dev">
                Website
            </a>
        </td>
    </tr>
    <tr>
        <td>
            <code>www-solid</code>
        </td>
        <td>
            <p>
                <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
                <img alt="SolidJS" src="https://img.shields.io/badge/SolidJS-2c4f7c?style=for-the-badge&logo=solid&logoColor=c8c9cb">
            </p>
            <p>
                <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
            </p>
        </td>
        <td>
            My personal website, but written with Solid.js.
        </td>
        <td>
            N/A
        </td>
    </tr>    
</table>

### `packages` Directory

<table>
    <tr>
        <th>Project Name</th>
        <th>Tech Stack</th>
        <th>Description</th>
        <th>Link(s)</th>
    </tr>
    <tr>
        <td>
            <code>react-resume</code>
        </td>
        <td>
            <p>
                <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
                <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
            </p>
        </td>
        <td>
            My personal resume, written in React.
        </td>
        <td>
            N/A
        </td>
    </tr>
    <tr>
        <td>
            <code>ui-react</code>
        </td>
        <td>
            <p>
                <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
                <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
            </p>
            <p>
                <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
                <img alt="RadixUI" src="https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white">
            </p>
        </td>
        <td>
            A shared React component library, created using RadixUI primitives and direction from the shadcn website.
        </td>
        <td>
            N/A
        </td>
    </tr>
</table>

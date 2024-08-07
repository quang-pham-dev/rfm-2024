# RFM-2024 Monorepo

## Start the application

Run `npx nx serve rfm-admin-app` to start the admin web application development server

Run `npx nx serve rfm-mobile-app` to start the react mobile application development server

Happy coding!

## Build for production

Run `npx nx build rfm-admin-app` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`.

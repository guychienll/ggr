# README

## Table of Contents

-   [README](#readme)
    -   [Table of Contents](#table-of-contents)
    -   [Demo Links](#demo-links)
    -   [Architecture](#architecture)
    -   [Prerequisites](#prerequisites)
    -   [Getting Started](#getting-started)
        -   [Clone the repository](#clone-the-repository)
        -   [Install dependencies](#install-dependencies)
        -   [Run the application](#run-the-application)
            -   [Build the application](#build-the-application)
                -   [development build](#development-build)
                -   [production build](#production-build)
    -   [Storybook](#storybook)

## Demo Links

-   [Demo](#)
-   [Storybook](#)
-   [Github](#)

## Architecture

```mermaid
flowchart TD

    subgraph script
        ts
        tsx
    end

    subgraph stylesheet
        scss
    end

    subgraph webpack
        script --> babel-loader --> .dist/bundle.js
        stylesheet --> sass-loader --> postcss-loader --> css-loader --> mini-extract-css-loader --> .dist/main.css
    end

    .dist/bundle.js --> html
    .dist/main.css --> html

    subgraph html
        script-tag
        link-tag
    end

    html --> browser --> client
```

## Prerequisites

| Dependency | Version          |
| ---------- | ---------------- |
| node       | v18.17 or higher |
| npm        | v9.6.7 or higher |

## Getting Started

### Clone the repository

```shell
git clone
```

### Install dependencies

```shell
npm install
```

### Run the application

Development watch mode would be run on https://localhost:3000

```shell
npm run dev
```

#### Build the application

##### development build

```shell
npm run build:dev
```

##### production build

```shell
npm run build:prod
```

## Storybook

```shell
npm run storybook
```

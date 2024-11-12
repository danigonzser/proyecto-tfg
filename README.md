<h1 align="center">
  <br>
  <a href="https://github.com/danigonzser/proyecto-tfg"><img src="https://danielgs-tfg.vercel.app/icon.svg" alt="Markdownify" width="125"></a>
  <br>
  Trabajo de Fin de Grado: Memes para todos
  <br>
</h1>

<h4 align="center">Plataforma web para la creación, edición y almacenamiento en línea de memes</h4>

<p align="center">
  <img src="https://img.shields.io/badge/pnpm-v9.12.2-blue" alt="Gitter">
  <img alt="GitHub deployments" src="https://img.shields.io/github/deployments/danigonzser/proyecto-tfg/Production?logo=github&label=Despliegue%20en%20producci%C3%B3n&link=https%3A%2F%2Fgithub.com%2Fdanigonzser%2Fproyecto-tfg%2Fdeployments%2FProduction">
  <img alt="GitHub License" src="https://img.shields.io/github/license/danigonzser/proyecto-tfg?link=https%3A%2F%2Fgithub.com%2Fdanigonzser%2Fproyecto-tfg%3Ftab%3DGPL-3.0-1-ov-file%23readme">
  <img alt="GitHub Release" src="https://img.shields.io/github/v/release/danigonzser/proyecto-tfg">
  <img alt="NPM Type Definitions" src="https://img.shields.io/npm/types/%40types%2Freact?logo=typescript&labelColor=white">
  <img alt="GitHub package.json prod dependency version" src="https://img.shields.io/github/package-json/dependency-version/danigonzser/proyecto-tfg/next?label=NEXT.js&labelColor=black&color=white">
  <img alt="GitHub package.json prod dependency version" src="https://img.shields.io/github/package-json/dependency-version/danigonzser/proyecto-tfg/fabric?label=Fabric.js&labelColor=blue&color=white&link=https%3A%2F%2Ffabricjs.com%2F">
  <img alt="Static Badge" src="https://img.shields.io/badge/eslint-comprobado-brightgreen?logo=eslint&logoColor=purple&labelColor=white">
  <img alt="Static Badge" src="https://img.shields.io/badge/shadcn%2Fui-black?logo=shadcnui&link=https%3A%2F%2Fui.shadcn.com%2F">
</p>

- **Tutor: Juan Julián Merelo Guervós [@JJ](https://github.com/JJ)**
- **Autor: Daniel González Serrano [@danigonzser](https://github.com/danigonzser)**

<p align="center">
  <a href="#documentación">Documentación</a> •
  <a href="#puesta-en-marcha">Puesta en marcha</a> •
  <a href="#desarrollo">Desarrollo</a> •
  <a href="#licencia">Licencia</a>
</p>

## Documentación 

La documentación está realizada con <img alt="Static Badge" src="https://img.shields.io/badge/LaTeX-%23008080?logo=latex"> por lo tanto es necesario compilar la memoria para generar el archivo PDF. 

Primero, hay que comprobar la ortografía y gramática con [TeXtidote](https://github.com/sylvainhalle/textidote) para ello:

```bash
cd doc
textidote proyecto.tex > /ruta/donde/queremos/el/informe/report.html
```

Lo siguiente es compilar la memoria. Para ello, solo haría falta instalar en nuestra distribución la utilidad make:

```bash
sudo apt-get install make
```

Seguidamente, compilamos la memoria:

```bash
make
```

En el archivo [Makefile](https://github.com/danigonzser/proyecto-tfg/blob/m0/estructura/doc/Makefile) se especifican e instalan las dependencias necesarias para compilar la memoria, estas son:

- texlive
- texlive-fonts-extra
- texlive-lang-spanish

## Puesta en marcha

Para simplemente, poder visualizar el proyecto en `http://localhost:3000/`

### Pre-requisitos

- [x] Tener instalado [pnpm](https://pnpm.io/installation).
- [x] Tener instalado [PotsgreSQL](https://www.postgresql.org/download/).

Además, se debe crear un fichero `.env` con los datos de la instalación local de su PostgreSQL siguiendo la siguiente plantilla:

```bash
DATABASE_URL="postgresql://postgres:12345@localhost:5432/nombre-bbdd"
POSTGRES_PRISMA_URL="postgresql://postgres:12345@localhost:5432/nombre-bbdd"
POSTGRES_URL_NON_POOLING="postgresql://postgres:12345@localhost:5432/nombre-bbdd"
```

Tras tener PostgreSQL instalado y establecer variables de entorno:

```bash
pnpm install && pnpm dlx prisma generate && pnpm dlx prisma migrate && pnpm run build && pnpm run start
```

Esta serie de ejecuciones de `pnpm` genera el cliente de Prisma ORM, hace las migraciones correspondientes para establecer la base de datos, construye el proyecto y por último inicia el servidor que sirve el proyecto.

Tras esto debería poder visualizar el proyecto en http://localhost:3000/

## Desarrollo

Para el desarrollo también se requieren los pre-requisitos de la <a href="#puesta-en-marcha">puesta en marcha</a>.

Además se debe realizar la instalación de dependencias:

```bash
pnpm install
```

### Requisitos de estilo de código

Existe una configuración recomendada para ejecutar las comprobaciones de estilo en [Visual Studio Code](https://code.visualstudio.com/) de forma automática que es la siguiente:

```json
"[typescript]": {
  "editor.defaultFormatter": "vscode.typescript-language-features",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
},

"[typescriptreact]": {
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "vscode.typescript-language-features"
},

"eslint.validate": [
  "typescriptreact"
],

"[prisma]": {
  "editor.formatOnSave": true,
},

```

Aún así, si se desea correr el lint por consola:

```bash
pnpm run lint
```

> [!WARNING]
> Si se desea colaborar en el proyecto es obligatorio el uso de linter.

### Tests

Existen tests para comprobar la funcionalidad. Estos deben pasar para realizar un despliegue o mezclar la rama en `master`. Para comprobarlos en local:

```bash
pnpm run test
```

Si se desean ejecutar a través de la interfaz de Cypress:

```bash
pnpm run tcy:open
```

### Desarrollo de código

A la hora del desarrollo no es practicable construir el código cada vez que se hace un cambio, para ello existe el comando `dev` que inicia el proyecto en modo desarrollo que escucha los cambios que se hagan y se reinicia en consecuencia. Para ello:

```bash
pnpm run dev
```

Tras esto debería poder visualizar el proyecto en http://localhost:3000/

## Licencia

Este proyecto tiene la licencia GPLv3.

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

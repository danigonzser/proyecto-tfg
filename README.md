# Trabajo de Fin de Grado: *Memes para todos*

- **Tutor: Juan Julián Merelo Guervós [@JJ](https://github.com/JJ)**
- **Autor: Daniel González Serrano [@danigonzser](https://github.com/danigonzser)**

## Documentación

La documentación está realizada con `LaTeX` por lo tanto es necesario compilar la memoria para generar el archivo PDF. 

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

## Código

El código está realizado en TypeScript. Existe una configuración recomendada para ejecutar el linter en Visual Studio Code que es la siguiente:

```json
"[typescript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
  },
},
```

Aún así, si se desea correr el lint por consola:

```bash
pnpm run lint
```

> [!WARNING]
> Si se desea colaborar en el proyecto es obligatorio el uso de linter.

Aún en esta parte del proyecto no existe funcionalidad, simplemente se pueden ejecutar los tests. Para ello:

```bash
pnpm run test
```

Si se desean ejecutar a través de la interfaz de Cypress:

```bash
pnpm run tcy:open
```

## Licencia

Este proyecto tiene la licencia GPLv3.

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

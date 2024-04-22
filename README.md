# Trabajo de Fin de Grado: *Memes para todos*

- **Tutor: Juan Julián Merelo Guervós [@JJ](https://github.com/JJ)**
- **Autor: Daniel González Serrano [@danigonzser](https://github.com/danigonzser)**

## Documentación

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/danigonzser/proyecto-tfg/latex.yml?logo=latex&logoColor=%23008181&label=spell%2C%20grammar%20and%20compilation%20checks)](https://github.com/danigonzser/proyecto-tfg/actions/workflows/latex.yml)

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
## Licencia

Este proyecto tiene la licencia GPLv3.

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

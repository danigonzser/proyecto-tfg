# Trabajo de Fin de Grado: *Aún por determinar*

### Autor(a): Daniel González Serrano
### Tutor(a)(es): Juan Julián Merelo Guervós
___

La documentación de este proyecto está realizada con `LaTeX`, por lo
tanto para generar el archivo PDF necesitaremos instalar `TeXLive` en
nuestra distribución.

Una vez instalada, tan solo deberemos situarnos en el directorio `doc` y ejecutar:

`
$ pdflatex proyecto.tex
`

Seguido por

    bibtex proyecto
    
y de nuevo

    pdflatex proyecto.tex

O directamente

    make

DOC := proyecto.tex
DEPENDENCIES := dependencies

all: doc

doc: $(DEPENDENCIES) $(DOC:.tex=.pdf)

all: proyecto.pdf

%.pdf: %.tex FORCE
	pdflatex $< && bibtex $* && pdflatex $< && pdflatex $<

FORCE: 

dependencies:
	@sudo apt-get install texlive && sudo apt-get install texlive-fonts-extra && sudo apt-get install texlive-lang-spanish
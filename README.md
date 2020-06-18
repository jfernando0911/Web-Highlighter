# Web-Highlighter (Google Chrome Extension)

Web higlighter is an extension for chrome that helps you highlight words, phrases or chunks of text. You can add descriptions, translation or any kind of details to the highlights. Everytime you find a word  on the web that you saved in your database it will be highlighted with their respective details, descriptions or details.

# Descripcion en español

Web highlighter es una extensión para el navegador Google Chrome que te ayuda a marcar palabras de un color y al hacer un hovering sobre la palabra marcada mostrara una descripción o significcado. Una vez seleccionada la palabra puede agregarsele una descripción. Una vez entrados los datos son guardados en una base de datos. Al ser encontrada la palabra o el conjunto de palabras, una frase, se marcaran con su respectiva descripción o significado. 

Las palabras se mercaran de color amarillo cada vez que la página sea cargada por primera vez, cuando te desplaces de manera horizontal por la página o si una página es muy dinámica se desenmarcaran las palabras y volvera a buscarlas desde la base de datos.

## Technologies used to develop this extension

* Javascript (ES6)
* Markjs library for highlights
* Chrome Storage, Tabs ContextMenu APIs
* Web Intersection Observer, MutationObserver APIs
* CSS
* HTML 

## Steps to install it

1. First download or clone the repository
2. Go to chrome://extensions in google chrome
3. Click on load unpacked
4. Select the directory or repository you downloaded


## Pasos para instalar la extensión

1. Primero descargar el repositorio
2. Escribe chrome://extensions en el navegador de Google Chrome
3. Cargar descomprimida
4. Seleccionar el repositorio descargado


## How to use it

1. Once installed go to any page. 
2. Select text on any page 
    ![alt text](https://gyazo.com/2b60ca4f6d14e216bff896ea40760408)
3. Right click to open the context menu and click on Highlight text: "%s"
    ![alt text](https://gyazo.com/1d3c41e2e3df76857f0e729fc328210d)
4. A menu will open in which it will show the text that will be highlighted and the description or definition you wanna add
    ![alt text](https://gyazo.com/605617560a66fc653d73c405fd82cc29)
5. Click on save to highlight it and stored in database
    ![alt text](https://gyazo.com/abe26c9b0216f9ba0907d8a586fb012d)
6. Everytime you encounter the word it will be lighlighted with its respective definition, description or none because it's optional

    
    
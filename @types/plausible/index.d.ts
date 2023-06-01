type Options = {
    callback?: () => void
    props: Record <string, string | number | undefined >
}

// no es dependencia, queremos extender a window

interface Window {
    plausible: (event: 'add_fox' | 'remove_fox', options?: Options) => void;
}

// dentro de window, nueva propiedad llamada plausible
// asi ayudamos a nuestros equipos a que no agreguen strings con cosas que no estamos haciendo

// lo vamos a definir para el uso de caso, es un funcion, que recibe un string
// se pueden agregar mas limites para crear una mejor API, puedes controlar la cantidad de eventos a aenviar a plausible
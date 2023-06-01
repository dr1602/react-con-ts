// Tercer y caurta forma de usar que es de la libreria de react
// typescript dentro de nuestro code base, tipos como functional componentes o abbreviacion de FC, tipos

import { type } from 'os';
import { FunctionComponent, FC, useRef, useEffect, useState } from 'react'

import type { ImgHTMLAttributes } from 'react';


// Primer forma de hacerlo

// export const RandomFox = () => {
//     return <img />
// }

// esto es typescript, es un super set de js, ts, esta encima de js. aunque parezca js, es ts haciendo inferenciass
// reconoce que es un componente de React, 

// Segunda forma de hacerlo
// no es bueno hacerlo implicito, es mejor hacer explicito

// generate a random function between 1 and 123

type LazyImageProps = { 
    src: string;
    onLazyLoad?: (img: HTMLImageElement) => void;
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNative;

// si queremos mas props como "alt", tendriamos que agregar mas variables con los respectivos valores que queremos aceptar en nuestro componente.

// al ser generico y asignar un nombre generico, usamos las mejores convenciones para el estableicmiento de appis en el dom. entre mas parecido nuestro componente a compoenntes nativos, como el que partimos, mas facil es para compa;eros usar componetnes, porque no tiene que aprender ni nuevos atributos ni tipso, porque seria como trabajar con un componente nativo.

export const LazyImage = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element  => { //ahora este componente es mas generico /// pasar todos los props posibles, pero no es necesario hacer destructuring
    // ...imgProps, todo lo que venga en props, conviertelo en una variable
    const node = useRef<HTMLImageElement>(null); // lo pasa como undefined, pero tipos de userfe espera imagne o nulo, como no tenemos la imagen lo pasamos como nulo
    const [isLazyLoaded, setIsLazyLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");// usaremos snipet de use state, el codigo de imagen gris se puede sacar curiosando con nextjs, sobre el componente de la imagen, una imagen con base 64 transparente, con formato super comprimido

    // esto solo tiene que pasar con el cliente, y universal rendinrng, solo el cliente

    useEffect (() => {

        if(isLazyLoaded) {
            return;
        }

        // nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // onIntersection -> console.log
                if (entry.isIntersecting) {
                    return;
                }
                setCurrentSrc(src);
                observer.disconnect();
                setIsLazyLoaded(true);
                console.log(setIsLazyLoaded);

                if (typeof onLazyLoad === 'function') {
                    onLazyLoad(node.current);
                }
            });
        });

        // observe node
        if(node.current) {
            observer.observe(node.current);
        };

        // desconectar, siempre que usamos un efecto, nos tenemos que desconectar, usaremos una funcion de limpieza
        return() => {
            observer.disconnect()
        }
    }, [src, onLazyLoad, isLazyLoaded]);
        
        // podriamos usar el operador del signo de admiracion, que es decirle que existe como el force de css
        // observer.observe(node.current!);

    return <img ref={node} src={currentSrc} {...imgProps} />;
            //onClick={onClick}
};

// cambiamos el valor con disrupting, no cambiamos el tipo, destructing

// export const RandomFox = (props: { image: string }): JSX.Element  => {

//     return <img width={300} height='auto' src={props.image} className='rounded'/>
// };

// una propiedad imagen tipo string, para la propiedad source... pero hay mas formas de hacerlo
// ahora acepta props, que por default son any, se puede definir de esa manera

// no le dicho a mi funcion que tiene que aceptar props

// lo queremos explciitoo porque queremos dejar en claro  que tiene que ser compoentne de React

// tercera forma con tipos importados, la diferencia con el segundo es que tipamos la constante, no es lo mismo pero el resultado produce lo mismo
// export const RandomFox: FunctionComponent = () => {
//     return <img />
// }

// cuarta forma, es que utilicen FC en lugar de Function Component
// export const RandomFox: FC = () => {
//     return <img />
// }

// si todas son iguales y validas, cual usamos? la recomenda es la segunda


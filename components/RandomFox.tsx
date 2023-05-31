// Tercer y caurta forma de usar que es de la libreria de react
// typescript dentro de nuestro code base, tipos como functional componentes o abbreviacion de FC, tipos

import type { FunctionComponent, FC } from 'react'

import { useRef } from'react'


// Primer forma de hacerlo

// export const RandomFox = () => {
//     return <img />
// }

// esto es typescript, es un super set de js, ts, esta encima de js. aunque parezca js, es ts haciendo inferenciass
// reconoce que es un componente de React, 

// Segunda forma de hacerlo
// no es bueno hacerlo implicito, es mejor hacer explicito

// generate a random function between 1 and 123

type Props = { image: string };

// si queremos mas props como "alt", tendriamos que agregar mas variables con los respectivos valores que queremos aceptar en nuestro componente.

export const RandomFox = ({ image }: Props): JSX.Element  => {
    const node = useRef()

    return <img ref={node} width={300} height='auto' src={image} className='rounded'/>
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


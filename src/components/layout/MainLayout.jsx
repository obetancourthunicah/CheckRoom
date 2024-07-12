import Header from '../header/Header';
import Footer from '../footer/Footer';
const MainLayout = ({ children }) => {
    return (
        <section className="page">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </section>
    )
}


/*
( props : Object : ReactElement-> children , custom props ) => {
    return jsx
}
*/

export default MainLayout;


/*
Componentes Funcionales
Los componentes funcionales son una forma de definir componentes en React. Son funciones de JavaScript que devuelven un elemento de React. Los componentes funcionales son más simples que los componentes de clase y se utilizan en la mayoría de los casos.

Componentes Stateful
Los componentes stateful son una forma de definir componentes en React. Son clases de JavaScript que extienden la clase Component de React. Los componentes stateful tienen un estado interno y pueden realizar operaciones más complejas que los componentes funcionales.
*/
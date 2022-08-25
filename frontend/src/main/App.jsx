import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import React from "react";

import Logo from "../components/template/Logo";
import Nav from "../components/template/Nav";
import Main from "../components/template/Main";
import Footer from "../components/template/Footer";

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <Main icon="home" title="Início" subtitle="Desafio frontend Collection">
            <div className="display-4">Bem Vindo!</div>
            <hr />
            <p className="mb-0">Olá, este é um sistema de listagem de materiais, nele você pode consultar, adicionar, editar ou excluir um mateial.
                Este sistema tem como objetivo avaliar minhas habilidade com desenvolvimento frontend, proposto pela empresa Collection.</p>
        </Main>
        <Footer />
    </div>
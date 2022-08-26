import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
    icon: "list",
    title: "Lista de Materiais",
    subtitle: "Você pode: Consultar, incluir, alterar e excluir qualquer material a lista."
}

const baseUrl = "http://localhost:3001/materials";
const initialState = {
    material: { name: "", email: "" },
    list: []
}

export default class MaterialCrud extends Component {
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        });
    }

    clear() {
        this.setState({ material: initialState.material });
    }

    save() {
        const material = this.state.material;
        const method = material.id ? "put" : "post";
        const url = material.id ? `${baseUrl}/${material.id}` : baseUrl;
        axios[method](url, material)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ material: initialState.material, list });
            });
    }

    getUpdatedList(material) {
        const list = this.state.list.filter(m => m.id !== material.id);
        if(material) {
            list.unshift(material);
        }
        return list;
    }

    load(material) {
        this.setState({ material });
    }

    remove(material) {
        axios.delete(`${baseUrl}/${material.id}`).then(resp => {
            const list = this.getUpdatedList(null);
            this.setState({ list });
        });
    }

    searchDescription() {
        return (
            <form>
                <div class="form-row">
                    <div class="form-group col">
                        <label for="descricao">Buscar por descrição</label>
                        <input id="descricao" type="text" class="form-control" placeholder="Descrição" />
                    </div>
                    <div class="form-group col">
                        <label for="linha">Buscar por linha</label>
                        <input id="linha" type="text" class="form-control" placeholder="Linha" />
                    </div>
                    <div class="form-group col">
                        <button type="submit" class="btn btn-success">Adicionar</button>
                    </div>
                </div>
            </form>
        )        
    }

    renderCards() {
        return this.state.list.map(material => {
            return (
                <div className="card" key={material.id}>
                    <img className="card-img-top" src={material.url_thumbnail} alt="Imagem do material" />
                    <div className="card-body align-self-start">
                        <h5 className="card-title">Descrição: {material.description}</h5>
                        <p className="card-text">Linha: {material.line}</p>
                        <button className="btn btn-primary">Editar</button>
                        <button className="btn btn-danger">Exlcuir</button>
                    </div>
                </div>
            );
        });
    }

    render() {
        console.log(this.state.list);
        return (
            <Main {...headerProps}>
                    {this.searchDescription()}
                    <div className="d-inline-flex flex-wrap justify-content-center">
                        {this.renderCards()}
                    </div>
            </Main>
        )
    }
}
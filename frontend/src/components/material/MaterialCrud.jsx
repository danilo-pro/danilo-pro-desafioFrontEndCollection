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
    list: [],
    description: "",
    line: "",
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

    getUpdatedList(material, add = true) {
        const list = this.state.list.filter(m => m.id !== material.id);

        if(add) {
            list.unshift(material);
        }

        return list;
    }

    load(material) {
        this.setState({ material });
        console.log(material);
    }

    remove(material) {
        axios.delete(`${baseUrl}/${material.id}`).then(resp => {
            const list = this.getUpdatedList(material, false);
            this.state({ list });
        });
    }

    setSearchDescription(e) {
        console.log(e, this.state.list);
        const list = this.state.list.filter((m) => m.description.toLowerCase().includes(e.toLowerCase(this.state.description)));
        
        this.setState({ list });
    }
    
    setSearchLine(e) {
        console.log(e, this.state.list);

        const list = this.state.list.filter((m) => m.line.toLowerCase().includes(e.toLowerCase(this.state.line)));

        this.setState({ list });
    }

    searchDescriptionAndLine() {
        const { description, line } = this.props;

        return (
            <form className="mx-5">
                <div className="form-row d-flex flex-wrap justify-content-around w-100">
                    <div className="col-md-6 mt-3">
                        <label>Buscar por descrição</label>
                        <input type="text" className="form-control" placeholder="Descrição"
                            value={description} 
                            onChange={e => this.setSearchDescription(e.target.value)} />
                    </div>
                    <div className="col-md-5 mt-3">
                        <label>Buscar por linha</label>
                        <input type="text" className="form-control" placeholder="Linha"
                            value={line}
                            onChange={e => this.setSearchLine(e.target.value)} />
                    </div>
                    <div className="col-md-1 mt-3">
                        <button type="btn btn-success" className="btn btn-success">Adicionar</button>
                    </div>
                </div>
            </form>
        );
    }

    renderCards() {
        return this.state.list.map(material => {
            return (
                <div className="card" key={material.id}>
                    <img className="card-img-top" src={material.url_thumbnail} alt="Imagem do material" />
                    <div className="card-body align-self-start">
                        <h5 className="card-title">Descrição: {material.description}</h5>
                        <p className="card-text">Linha: {material.line}</p>
                        <button className="btn btn-primary" onClick={() => this.load(material)}>Editar</button>
                        <button className="btn btn-danger" onClick={() => this.remove(material)}>Exlcuir</button>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <Main {...headerProps}>
                    {this.searchDescriptionAndLine()}
                    <div className="d-inline-flex flex-wrap justify-content-center">
                        {this.renderCards()}
                    </div>
            </Main>
        )
    }
}
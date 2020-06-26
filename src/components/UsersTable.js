import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import '../custom.css'

default export class UsersTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            columns: ["Number", "Name", "Role"],
            isRedirect: false,
        };
        this.setRedirect.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        let data = await ConfigsService.getAllConfigs();
        this.setState({ data: data, isLoading: false });
    }

    renderColumns() {
        const columns = this.state.columns.slice();

        return columns.map((column) => (
            <th key={column}
                className={'table-' + column + '-th text-center'}>
                <span>{column.replace(/^\w/, c => c.toUpperCase())}</span>
            </th>
        ));
    }

    setRedirect = async (code) => {
        let data = await ConfigsService.getConfig(code);
        this.setState({
            isRedirect: true,
            editCode: code,
            editData: data
        })
    }

    renderRedirect = () => {
        if (this.state.isRedirect) {
            return <Redirect to={{
                pathname: `/configs/${this.state.editCode}`,
                state: {
                    data: this.state.editData
                }
            }} />;
        }
    }

    renderData() {
        const self = this;
        const data = this.state.data.slice();
        const columns = this.state.columns.slice();

        return data.map(function (row, row_index) {
            row.index = row_index;

            return (
                <tr key={row_index} className="text-center" onClick={async () => await self.setRedirect(row['code'])}>
                    {
                        columns.map((column, index) => (
                            <td key={column + index} className={'table-' + column + '-td'}>
                                {column === 'Value' ?
                                    TypesValidation.prepareForDisplay(row['type'], row[column.toLowerCase()]) :
                                    column === 'Type' ? Object.keys(TypesValidation.types)[row[column.toLowerCase()]] : row[column.toLowerCase()]}
                            </td>
                        ))
                    }
                </tr>
            )
        });
    }

    render() {
        return (
            <div className="card-body">
                {this.renderRedirect()}
                <div className="table-responsive" style={{ maxHeight: 'unset' }}>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                {this.renderColumns()}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.length > 0 ?
                                    this.renderData() : (
                                        this.state.isLoading ? 
                                            <tr className="text-center">
                                                <td colSpan={this.state.columns.length}>Loading...</td>
                                            </tr> :
                                            <tr className="text-center">
                                                <td colSpan={this.state.columns.length}>Empty Results</td>
                                            </tr>
                                        )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

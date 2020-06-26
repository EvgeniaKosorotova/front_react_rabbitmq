import React, { Component } from 'react';
import UserService from '../services/UserService';
import RoleService from '../services/RoleService';

export default class UsersTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            columns: ["Id", "Username", "Role"],
            roles: [],
            isEdit: false,
            editData: {
                id: null,
                username: null,
                roleId: null,
                password: null
            }
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        let data = await UserService.getAsync();
        let roles = await RoleService.getAsync();

        if (data !== undefined && roles !== undefined) {
            this.setState({ data: data.users, isLoading: false, roles: roles.roles });
        }
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

    setEdit = async (data) => {
        this.setState({
            isEdit: true,
            editData: {
                id: data.id,
                username: data.username,
                password: data.password,
                roleId: data.roleId
            }
        })
    }

    changeRole = async (event) => {
        await this.updateData(event.target.value);
    }

    updateData = async (roleId) => {
        let data = this.state.editData;
        data.roleId = Number(roleId);
        await UserService.updateAsync(data) && this.getData();
    }

    renderData() {
        const self = this;
        const data = this.state.data.slice();
        const columns = this.state.columns.slice();

        return data.map(function (row, row_index) {
            row.index = row_index;

            return (
                <tr key={row_index} className="text-center" onClick={async () => await self.setEdit(row)}>
                    {
                        columns.map((column, index) => (
                            <td key={column + index} className={'table-' + column + '-td'}>
                                {(column.toLowerCase() === 'role') ? 
                                    ((self.state.isEdit && self.state.editData.id === row['id']) ?
                                        <select className="btn" onChange={async (e) => await self.changeRole(e)} defaultValue={row['roleId']}>
                                            {self.state.roles.map(role =>
                                                <option key={role.role} value={role.id}>{role.role}</option>
                                            )}
                                        </select> :
                                        self.state.roles.map(role =>
                                            role.id === row['roleId'] && 
                                            <span key={column + index}>{role.role}</span>
                                        )) : 
                                    <span>{row[column.toLowerCase()]}</span>
                                }
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
                <div className="table-responsive" style={{ maxHeight: 'unset' }}>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                {this.renderColumns()}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data !== undefined && this.state.data.length > 0 ?
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

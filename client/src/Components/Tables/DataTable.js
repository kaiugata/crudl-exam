import React from 'react'
import {Button, Table} from 'reactstrap';
import ModalForm from '../Modals/Modal'
import {_DELETE} from "../../Utils/requestMaker";
import {USERS_URL} from "../../Utils/Constants";

function DataTable(props) {
    const deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?')
        if (confirmDelete) {
            _DELETE(USERS_URL + id).then((resp) => {
                if (resp.success) props.deleteItemFromState(id)
                else if (resp.message) alert(resp.message)
            })
        }
    }

    const usersToShow = (Array.isArray(props.users)) ?
        props.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.middleName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.address}</td>
                    <td>{user.roleName}</td>
                    <td>
                        <div style={{width: "110px"}}>
                            <ModalForm buttonLabel="Edit" item={user} roles={props.roles}
                                       updateState={props.updateState}/>
                            {' '}
                            <Button color="danger" onClick={() => deleteItem(user.id)}>Del</Button>
                        </div>
                    </td>
                </tr>
            )
        }) : <tr><td>No data</td></tr>


    return (
        <Table responsive hover>
            <thead>
            <tr>
                <th>FirstName</th>
                <th>MiddleName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {usersToShow}
            </tbody>
        </Table>
    )
}

export default DataTable
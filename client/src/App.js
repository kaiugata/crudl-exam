import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import {ROLES_URL, USERS_URL} from "./Utils/Constants";
import {_GET} from "./Utils/requestMaker";
import DataTable from "./Components/Tables/DataTable";


function App(props) {

    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(false)

    const getUsers = () => {
        setLoading(true)
        _GET(USERS_URL)
            .then(resp => {
                if (resp.message) {
                    console.log(resp.message)
                    alert(resp.message)
                } else {
                    setUsers(resp)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            });
    }

    const getRoles = () => {
        setLoading(true)
        _GET(ROLES_URL)
            .then(resp => {
                if (resp.message) {
                    console.log(resp.message)
                    alert(resp.message)
                } else {
                    setRoles(resp)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const addUserToState = (user) => {
        setUsers([...users, user])
    }
    const addRoleToState = (role) => {
        setRoles([...roles, role])
    }

    const updateState = (user) => {
        const userIdx = users.findIndex(data => data.id === user.id)
        const newArray = [...users.slice(0, userIdx), user, ...users.slice(userIdx + 1)]
        setUsers(newArray)
    }

    const deleteUserFromState = (id) => {
        const updated = users.filter(user => user.id !== id)
        setUsers(updated)
    }

    useEffect(() => {
        getRoles()
        getUsers()
    }, []);

    return (
        (!loading)?<Container className="App">
                <Row>
                    <Col>
                        <h1 style={{margin: "20px 0"}}>CRUDLE Users</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable users={users} roles={roles} updateState={updateState}
                                   deleteItemFromState={deleteUserFromState}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ModalForm buttonLabel="Add User" addItemToState={addUserToState} roles={roles}/>
                        <ModalForm buttonLabel="Add Role" addItemToState={addRoleToState}/>
                    </Col>
                </Row>
            </Container>:
            <Container className="App">
                <Row>
                    <Col>
                        <h1 style={{margin: "20px 0"}}>Loading...</h1>
                    </Col>
                </Row>
            </Container>
    )
}

export default App
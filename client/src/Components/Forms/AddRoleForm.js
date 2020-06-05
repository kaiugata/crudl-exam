import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {ROLES_URL} from "../../Utils/Constants";
import {_POST} from "../../Utils/requestMaker";

function AddRoleForm(props) {
    const [role, setValue] = useState({
        name: ''
    })

    const onChange = e => {
        setValue({
            [e.target.name]: e.target.value
        })
    }

    const submitFormAdd = e => {
        e.preventDefault()
        if (role.name.length > 1) {
            let body = JSON.stringify({
                name: role.name
            })
            _POST({url: ROLES_URL, body: body})
                .then(resp => {
                    console.log(resp)
                    if (resp.message) {
                        console.log(resp.message)
                        alert(resp.message)
                    } else {
                        props.addItemToState(resp)
                        props.toggle()
                    }
                })
        } else {
            console.log('Role name is required')
            alert('Role name is required')
        }
    }

    return (
        <Form onSubmit={submitFormAdd}>
            <FormGroup>
                <Label for="name">Role Name</Label>
                <Input type="text" name="name" id="name" onChange={onChange}
                       value={role.name === null ? '' : role.name}/>
            </FormGroup>
            <Button>Add Role</Button>
        </Form>
    )
}

export default AddRoleForm
import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {_POST, _PUT} from "../../Utils/requestMaker";
import {USERS_URL} from "../../Utils/Constants";
import DropdownComp from "../Common/Dropdown";

function AddEditForm(props) {
    const [form, setValues] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        roleName: '',
        roleId: '',
    })

    const onChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const prepareBody = () => {
        return JSON.stringify({
            firstName: form.firstName,
            middleName: form.middleName,
            lastName: form.lastName,
            address: form.address,
            RoleId: form.roleId
        })
    }
    const checkForm = () => {
        let formValid = true;
        for (const formElement in form) {
            if (formElement === null || formElement === '') formValid = false
        }
        return formValid;
    }


    const submitFormAdd = e => {
        e.preventDefault()
        if (checkForm()) {
            _POST({body: prepareBody(), url: USERS_URL})
                .then(resp => {
                    if (resp.message) {
                        console.log(resp.message)
                        alert(resp.message)
                    } else {
                        props.addItemToState(resp)
                        props.toggle()
                    }
                })
        } else {
            console.log('All fields are required')
            alert('All fields are required')
        }
    }

    const submitFormEdit = e => {
        e.preventDefault()
        if (checkForm()) {
            _PUT({body: prepareBody(), url: USERS_URL + form.id})
                .then(resp => {
                    if (resp.message) {
                        alert(resp.message)
                        console.log(resp.message)
                    } else {
                        props.updateState(resp)
                        props.toggle()
                    }
                })
        } else {
            console.log('All fields are required')
            alert('All fields are required')
        }
    }

    const setSelected = (e) => {
        setValues({
            ...form,
            roleName: e.target.innerText,
            roleId: e.target.id
        })
    };

    useEffect(() => {
        if (props.item) {
            const {id, firstName, middleName, lastName, address, roleId} = props.item
            setValues({id, firstName, middleName, lastName, address, roleId})
        }
    }, [])

    return (
        <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
            <FormGroup>
                <Label for="first">First Name</Label>
                <Input type="text" name="firstName" id="first" onChange={onChange}
                       value={form.firstName === null ? '' : form.firstName}/>
            </FormGroup>
            <FormGroup>
                <Label for="middle">Middle Name</Label>
                <Input type="text" name="middleName" id="middle" onChange={onChange}
                       value={form.middleName === null ? '' : form.middleName}/>
            </FormGroup>
            <FormGroup>
                <Label for="last">Last Name</Label>
                <Input type="text" name="lastName" id="last" onChange={onChange}
                       value={form.lastName === null ? '' : form.lastName}/>
            </FormGroup>
            <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" onChange={onChange}
                       value={form.address === null ? '' : form.address}/>
            </FormGroup>
            <FormGroup>
                <Label for="role">Role</Label>
                <div>{form.roleName}</div>
                <DropdownComp roles={props.roles} setSelected={setSelected}/>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}

export default AddEditForm
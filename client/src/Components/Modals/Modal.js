import React, {useState} from 'react'
import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap'
import AddEditForm from '../Forms/AddEditForm'
import AddRoleForm from '../Forms/AddRoleForm'

function ModalForm(props) {
    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>
    const label = props.buttonLabel

    let button = ''
    let title = ''
    let addForm = ''

    if (label === 'Edit') {
        title = 'Edit User'
        button = <Button
            color="warning"
            onClick={toggle}
            style={{float: "left", marginRight: "10px"}}>{label}
        </Button>
        addForm = <AddEditForm
            addItemToState={props.addItemToState}
            updateState={props.updateState}
            setSelected={props.setSelected}
            toggle={toggle}
            item={props.item}
            roles={props.roles}/>

    } else if (label === 'Add User') {
        title = 'Add New User'
        button = <Button
            color="success"
            onClick={toggle}
            style={{float: "left", marginRight: "10px"}}>{label}
        </Button>
        addForm = <AddEditForm
            addItemToState={props.addItemToState}
            updateState={props.updateState}
            setSelected={props.setSelected}
            toggle={toggle}
            item={props.item}
            roles={props.roles}/>

    } else {
        title = 'Add New Role'
        button = <Button
            color="success"
            onClick={toggle}
            style={{float: "left", marginRight: "10px"}}>{label}
        </Button>
        addForm = <AddRoleForm
            addItemToState={props.addItemToState}
            toggle={toggle}/>
    }


    return (
        <div>
            {button}
            <Modal isOpen={modal} toggle={toggle} className={props.className}>
                <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
                <ModalBody>
                    {addForm}
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalForm
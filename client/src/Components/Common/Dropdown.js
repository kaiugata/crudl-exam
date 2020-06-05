import React, {useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

const DropdownComp = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const roles = props.roles.map(role => {
        return (
            <DropdownItem onClick={props.setSelected} key={role.id} id={role.id}>{role.name}</DropdownItem>
        )
    })
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Choose Role
            </DropdownToggle>
            <DropdownMenu>
                {roles}
            </DropdownMenu>
        </Dropdown>
    );
}

export default DropdownComp;

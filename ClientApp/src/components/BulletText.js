import React from 'react';

export const BulletText = ({ id, text, actions }) => {

    const handleClick = () => {
        actions.setActiveBullet(id);
    }

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;

        actions.setBulletText(id, value);
    }

    return <li onClick={handleClick}>
        {actions.getActiveBullet() == id ?
            <input name={`bulletText_${id}`} type="text" onChange={handleChange} value={text} />
            :
            text
        }
        </li>

}

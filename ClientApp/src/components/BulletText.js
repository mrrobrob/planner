export const BulletText = ({ groupId, id, text, actions }) => {

    const handleClick = () => {
        actions.setActiveBullet(id);
    }

    const handleChange = (event) => {
        const { value } = event.currentTarget;

        actions.setBulletText(id, value);
    }

    const handleEnterPress = () => {
        if (text === "") {
            actions.moveBulletAfter(id, groupId);
        } else {
            actions.addBulletAfter(id);
        }
    }



    const handleKeyPress = (event) => {
        switch (event.key) {
            case "Enter":
                handleEnterPress();
                break;
            default:
                break;
        }
    }

    return <li onClick={handleClick}>
        {actions.getActiveBullet() === id ?
            <input name={`bulletText_${id}`} type="text" onChange={handleChange} onKeyPress={handleKeyPress} value={text} />
            :
            text
        }
    </li>

}

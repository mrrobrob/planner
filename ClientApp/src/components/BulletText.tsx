import { ListGroupItem } from 'reactstrap';

export const BulletText = ({ groupId, id, text, actions } : any) => {

    const handleClick = () => {
        actions.setActiveBullet(id);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        actions.setBulletText(id, value);
    }

    const handleEnterPress = () => {
        if (text === "") {
            actions.moveBulletAfter(id, groupId);
        } else if (text.startsWith(" ")) {
            actions.makeBulletGroup(id);
        } else {
            actions.addBulletAfter(id);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "Enter":
                handleEnterPress();
                break;
            default:
                break;
        }
    }

    return <ListGroupItem onClick={handleClick}>
        {actions.getActiveBullet() === id ?
            <input autoFocus name={`bulletText_${id}`} type="text" onChange={handleChange} onKeyPress={handleKeyPress} value={text} />
            :
            text
        }
    </ListGroupItem>

}

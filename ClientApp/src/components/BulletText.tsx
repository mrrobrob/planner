import { ListGroupItem, Input } from 'reactstrap';
import { IBullet, IHasBulletActions, IHasGroupId } from './BulletModels';

export const BulletText = ({ groupId, id, text, actions }: IHasGroupId & IBullet & IHasBulletActions) => {

    const handleClick = () => {
        actions.setActiveBulletId(id);
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
            actions.addNewBulletAfter(id);
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
        {actions.getActiveBulletId() === id ?
            <Input autoFocus name={`bulletText_${id}`} type="text" onChange={handleChange} onKeyPress={handleKeyPress} value={text} />
            :
            text
        }
    </ListGroupItem>

}

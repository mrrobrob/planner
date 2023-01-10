import { useState } from 'react';
import { BulletGroup } from './BulletGroup';
import { v4 as uuidv4 } from 'uuid';

export const BulletEditor = () => {

    const rootBullet = ({
        id: "a",
        type: "group",
        bulletIds: ["b", "c"]
    });

    const [activeBullet, setActiveBullet] = useState(rootBullet.id);

    const [bullets, setBullets] = useState({
        "a": rootBullet,
        "b": {
            id: "b",
            type: "text",
            text: "thing"
        },
        "c": {
            id: "c",
            type: "group",
            bulletIds: ["d"]
        },
        "d": {
            id: "d",
            type: "text",
            text: "thing2"
        }
    });

    const getBullet = (id) => bullets[id];

    const setBulletText = (id, value) => {
        setBullets({ ...bullets, [id]: { ...bullets[id], text: value } });
    }

    const findContainerId = (id) => {
        const containerId = Object.keys(bullets).find(e => bullets[e].bulletIds && bullets[e].bulletIds.includes(id));

        return bullets[containerId].id;
    }

    const moveBulletAfter = (id, groupId) => {

    }

    const addBulletAfter = (id) => {
        const containerId = findContainerId(id);

        const newBullet = {
            id: uuidv4(),
            type: "text",
            text: ""
        };

        const container = bullets[containerId];
        const targetIndex = container.bulletIds.indexOf(id);
        const newIds = container.bulletIds.slice();
        
        newIds.splice(targetIndex + 1, 0, newBullet.id);

        
        setBullets({
            ...bullets,
            [containerId]: {
                ...container,
                bulletIds: newIds
            },
            [newBullet.id]: newBullet
        });

        setActiveBullet(newBullet.id);
    }

    const actions = {
        getActiveBullet: () => activeBullet,
        setActiveBullet,
        getBullet,
        setBulletText,
        moveBulletAfter,
        addBulletAfter,
    };

    return <div>
        <ul><BulletGroup {...rootBullet} actions={actions} /></ul>
    </div>
}

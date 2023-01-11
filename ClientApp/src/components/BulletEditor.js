import { useState } from 'react';
import { BulletGroup } from './BulletGroup';
import { v4 as uuidv4 } from 'uuid';
import { ListGroup } from 'reactstrap';
import { BulletText } from './BulletText';

export const BulletEditor = () => {

    const rootContainerId = "a";

    const [activeBullet, setActiveBullet] = useState(rootContainerId);

    const [bullets, setBullets] = useState({
        "a": {
            id: "a",
            type: "group",
            text: "group A",
            bulletIds: ["b", "c"]
        },
        "b": {
            id: "b",
            type: "text",
            text: "thing"
        },
        "c": {
            id: "c",
            type: "group",
            text: "group C",
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

        if (groupId === rootContainerId) {
            return;
        }

        const fromContainer = bullets[groupId];
        const newFromIds = fromContainer.bulletIds.filter(e => e !== id);

        const toContainerId = findContainerId(groupId);
        const toContainer = bullets[toContainerId];
        let targetIndex = toContainer.bulletIds.indexOf(groupId) + 1;
        const newToIds = toContainer.bulletIds.slice();

        while (bullets[newToIds[targetIndex]] && bullets[newToIds[targetIndex]].type === "group") {
            targetIndex++;
        }
        newToIds.splice(targetIndex, 0, id);

        setBullets({
            ...bullets,
            [groupId]: {
                ...fromContainer,
                bulletIds: newFromIds
            },
            [toContainerId]: {
                ...toContainer,
                bulletIds: newToIds
            },

        });
    }

    const makeBulletGroup = (id) => {

        const newBullet = {
            id: uuidv4(),
            type: "text",
            text: ""
        };

        setBullets({
            ...bullets,
            [id]: {
                ...bullets[id],
                type: "group",
                bulletIds: [newBullet.id]
            },
            [newBullet.id]: newBullet
        });

        setActiveBullet(newBullet.id);

    }

    const addBulletAfter = (id) => {

        const current = bullets[id];

        const containerId = current.type === "group" ? id : findContainerId(id);

        const newBullet = {
            id: uuidv4(),
            type: "text",
            text: ""
        };

        const container = bullets[containerId];
        let targetIndex = container.bulletIds.indexOf(id) + 1;
        const newIds = container.bulletIds.slice();

        while (bullets[newIds[targetIndex]] && bullets[newIds[targetIndex]].type === "group") {
            targetIndex++;
        }

        newIds.splice(targetIndex, 0, newBullet.id);

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
        makeBulletGroup,
    };

    const rootBullet = bullets[rootContainerId];

    return <ListGroup>
        <BulletText {...rootBullet} groupId={rootBullet.id} actions={actions} />
        <ListGroup style={{ paddingLeft: 20 }} >
            <BulletGroup {...rootBullet} actions={actions} />
        </ListGroup>
    </ListGroup>
}

import { useState } from 'react';
import { BulletGroup } from './BulletGroup';
import { v4 as uuidv4 } from 'uuid';
import { ListGroup } from 'reactstrap';
import { BulletText } from './BulletText';
import { IBullet } from './BulletModels';

export const BulletEditor = () => {

    const rootContainerId = "a";

    const [activeBullet, setActiveBullet] = useState(rootContainerId);

    const [bullets, setBullets] = useState<IBullet[]>([
        {
            id: "a",
            type: "group",
            text: "group A",
            bulletIds: ["b", "c"]
        },
        {
            id: "b",
            type: "text",
            text: "thing",
            bulletIds: []
        },
        {
            id: "c",
            type: "group",
            text: "group C",
            bulletIds: ["d"]
        },
        {
            id: "d",
            type: "text",
            text: "thing2",
            bulletIds: []
        }
    ]);

    const getBullet = (id: string) => {
        const bullet = bullets.find(e => e.id === id);

        if (!bullet) {
            throw new Error(`Bullet not found for id : ${id}`);
        }

        return bullet;
    }

    const setBulletText = (id: string, value: string) => {
        setBullets(bullets.map(e => e.id === id ? { ...e, text: value } : e));
    }

    const findContainerId = (id: string) => {
        const container = bullets.find(e => e.bulletIds.includes(id));

        if (!container) {
            throw new Error(`Cannot find container id ${id}`);
        }

        return container.id;
    }

    const moveBulletAfter = (id: string, groupId: string) => {

        if (groupId === rootContainerId) {
            return;
        }

        const fromContainer = getBullet(groupId);
        const newFromIds = fromContainer.bulletIds.filter(e => e !== id);

        const toContainerId = findContainerId(groupId);
        const toContainer = getBullet(toContainerId);

        let targetIndex = toContainer.bulletIds.indexOf(groupId) + 1;
        const newToIds = toContainer.bulletIds.slice();

        while (newToIds.length > targetIndex && getBullet(newToIds[targetIndex]).type === "group") {
            targetIndex++;
        }
        newToIds.splice(targetIndex, 0, id);

        setBullets(bullets.map(e =>
            e.id === fromContainer.id ? { ...fromContainer, bulletIds: newFromIds } :
                e.id === toContainer.id ? { ...toContainer, bulletIds: newToIds } :
                    e))
    }

const makeBulletGroup = (id: string) => {

    const newBullet = {
        id: uuidv4(),
        type: "text" as const,
        text: "",
        bulletIds: []
    };

    const newBullets = bullets.map(e => e.id === id ? { ...e, type: "group" as const, bulletIds: [newBullet.id] } : e);

    newBullets.push(newBullet);
    setBullets(newBullets);

    setActiveBullet(newBullet.id);

}

const addBulletAfter = (id: string) => {

    const current = getBullet(id);

    const containerId = current.type === "group" ? id : findContainerId(id);

    const newBullet = {
        id: uuidv4(),
        type: "text" as const,
        text: "",
        bulletIds: []
    };

    const container = getBullet(containerId);
    let targetIndex = container.bulletIds.indexOf(id) + 1;
    const newIds = container.bulletIds.slice();

    while (newIds.length > targetIndex && getBullet(newIds[targetIndex]).type === "group") {
        targetIndex++;
    }

    newIds.splice(targetIndex, 0, newBullet.id);

    const newBullets = bullets.map(e => e.id === containerId ? { ...e, bulletIds: newIds } : e);
    newBullets.push(newBullet);

    setBullets(newBullets);

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

const rootBullet = getBullet(rootContainerId);

return <ListGroup>
    <BulletText {...rootBullet} groupId={rootBullet.id} actions={actions} />
    <ListGroup style={{ paddingLeft: 20 }} >
        <BulletGroup {...rootBullet} actions={actions} />
    </ListGroup>
</ListGroup>
}

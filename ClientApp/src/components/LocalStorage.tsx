import { useEffect, useState } from "react";
import { IStorage } from "./BulletModels";
import { v4 as uuidv4 } from 'uuid';

export const LocalStorage = ({ rootContainerId, children, initialState }: any) => {

    const [storage, setStorage] = useState<IStorage>(initialState);

    useEffect(() => {
        localStorage.setItem(`storage_${rootContainerId}`, JSON.stringify(storage));
    }, [storage]);

    const getBullet = (id: string) => {
        const bullet = storage.bullets.find(e => e.id === id);

        if (!bullet) {
            throw new Error(`Bullet not found for id : ${id}`);
        }

        return bullet;
    }

    const setBulletText = (id: string, value: string) => {
        setStorage({ ...storage, bullets: storage.bullets.map(e => e.id === id ? { ...e, text: value } : e) });
    }

    const findContainerId = (id: string) => {
        const container = storage.bullets.find(e => e.bulletIds.includes(id));

        if (!container) {
            throw new Error(`Cannot find container id ${id}`);
        }

        return container.id;
    }

    const moveBulletAfter = (id: string, groupId: string) => {

        if (groupId === rootContainerId) {
            const bullet = getBullet(id);

            if (bullet.text === "" && id !== rootContainerId) {
                const rootContainer = getBullet(rootContainerId);

                // remove bullet and set id to next (or last, or rootcontainer)
                const indexOfId = rootContainer.bulletIds.indexOf(id);
                const newIds = rootContainer.bulletIds.filter(e => e !== id);

                let newActiveBullet: string;
                if (newIds.length === 0) {
                    newActiveBullet = rootContainer.id;
                } else if (newIds.length >= indexOfId) {
                    newActiveBullet = newIds[newIds.length - 1];
                } else {
                    newActiveBullet = newIds[indexOfId]
                }

                setStorage({
                    activeBulletId: newActiveBullet,
                    bullets: storage.bullets
                        .filter(e => e.id !== id)
                        .map(e => e.id === groupId ? { ...e, bulletIds: newIds } : e)
                });
            }

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

        setStorage({
            ...storage,
            bullets: storage.bullets.map(e =>
                e.id === fromContainer.id ? { ...fromContainer, bulletIds: newFromIds } :
                    e.id === toContainer.id ? { ...toContainer, bulletIds: newToIds } :
                        e)
        })
    }

    const makeBulletGroup = (id: string) => {

        const newBullet = {
            id: uuidv4(),
            type: "text" as const,
            text: "",
            bulletIds: []
        };

        const newBullets = storage.bullets.map(e => e.id === id ? { ...e, type: "group" as const, bulletIds: [newBullet.id] } : e);

        newBullets.push(newBullet);
        setStorage({ activeBulletId: newBullet.id, bullets: newBullets });
    }

    const addNewBulletAfter = (id: string) => {

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

        const newBullets = storage.bullets.map(e => e.id === containerId ? { ...e, bulletIds: newIds } : e);
        newBullets.push(newBullet);

        setStorage({ activeBulletId: newBullet.id, bullets: newBullets });
    }

    const setActiveBulletId = (id: string) => {
        setStorage({ ...storage, activeBulletId: id });
    }

    const props = {
        rootBullet: getBullet(rootContainerId),
        actions: {
            getActiveBulletId: () => storage.activeBulletId,
            setActiveBulletId,
            getBullet,
            setBulletText,
            moveBulletAfter,
            addNewBulletAfter,
            makeBulletGroup,
        }
    }

    return children(props);
}
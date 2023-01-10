import React, { useState } from 'react';
import { BulletGroup } from './BulletGroup';

export const BulletEditor = () => {

    const [activeBullet, setActiveBullet] = useState(1);

    const rootBullet = ({
        id: 1,
        type: "group",
        bulletIds: [2, 3]
    });

    const [bullets, setBullets] = useState({
        "1": rootBullet,
        "2": {
            id: 2,
            type: "text",
            text: "thing"
        },
        "3": {
            id: 3,
            type: "group",
            bulletIds: [4]
        },
        "4": {
            id: 4,
            type: "text",
            text: "thing2"
        }
    });

    const getBullet = (id) => {
        return bullets[id];
    }

    const setBulletText = (id, value) => {
        setBullets({ ...bullets, [id]: { ...bullets[id], text: value } });
    }

    const actions = {
        getActiveBullet: () => activeBullet,
        setActiveBullet: setActiveBullet,
        getBullet: getBullet,
        setBulletText: setBulletText
    };

    return <div>
        <ul><BulletGroup {...rootBullet} actions={actions} /></ul>
    </div>
}

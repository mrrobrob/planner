import React, { useState } from 'react';
import { BulletGroup } from './BulletGroup';

export const BulletEditor = () => {

    const bullets = [];

    bullets.push({
        type: "text",
        text: "thing"
    });

    bullets.push({
        type: "group",
        bullets: []
    });

    bullets[1].bullets.push({
        type: "text",
        text: "thing2"
    });

    return <div>
        <ul><BulletGroup bullets={bullets} /></ul>
    </div>
}

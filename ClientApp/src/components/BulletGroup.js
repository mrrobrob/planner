import React from 'react';
import { BulletText } from './BulletText';

export const BulletGroup = ({ bulletIds, actions }) => {
    
    return bulletIds.map(bulletId => {
        const bullet = actions.getBullet(bulletId);
        switch (bullet.type) {
            case "group":
                return <ul key={bullet.id}><BulletGroup {...bullet} actions={actions} /></ul>;
            case "text":
                return <BulletText key={bullet.id} {...bullet} actions={actions} />;
            default: 
                throw new Error(`invalid bullet type : ${bullet.type}`);
        }
    });
}

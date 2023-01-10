import React from 'react';

export const BulletGroup = ({ bullets }) => {

    return bullets.map(bullet => {
        switch (bullet.type) {
            case "group":
                return <ul><BulletGroup bullets={bullet.bullets} /></ul>;
            case "text":
                return <li>{bullet.text}</li>;
        }
    });

}


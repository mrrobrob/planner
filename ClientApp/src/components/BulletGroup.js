import React from 'react';

export const BulletGroup = (props) => {

    return props.bullets.map(bullet => {
        switch (bullet.type) {
            case "group":
                return <ul><BulletGroup bullets={bullet.bullets} /></ul>;
            case "text":
                return <li>{bullet.text}</li>;
        }
    })

}


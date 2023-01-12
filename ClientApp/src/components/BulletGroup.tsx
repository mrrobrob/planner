import { BulletText } from './BulletText';
import { ListGroup } from 'reactstrap';
import React from 'react';

export const BulletGroup = ({ groupId, id, bulletIds, actions }: any) => {
    
    return <>{
        (bulletIds as string[]).map(bulletId => {
            const bullet = actions.getBullet(bulletId);
            switch (bullet.type) {
                case "group":
                    return <React.Fragment key = {bullet.id}>
                        <BulletText {...bullet} groupId={groupId} actions={actions} />
                        <ListGroup style={{ paddingLeft: 20 }} key={bullet.id}>
                            <BulletGroup {...bullet} groupId={bullet.id} actions={actions} />
                        </ListGroup>
                    </React.Fragment>;
                case "text":
                    return <BulletText key={bullet.id} {...bullet} groupId={id} actions={actions} />;
                default:
                    throw new Error(`invalid bullet type : ${bullet.type}`);
            }
        })
    }</>
}

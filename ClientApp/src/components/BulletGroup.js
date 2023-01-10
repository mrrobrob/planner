import { BulletText } from './BulletText';

export const BulletGroup = ({ id, bulletIds, actions }) => {
    
    return bulletIds.map(bulletId => {
        const bullet = actions.getBullet(bulletId);
        switch (bullet.type) {
            case "group":
                return <>
                    <BulletText {...bullet} groupId={bullet.id} actions={actions} />
                    <ul key={bullet.id}>
                        <BulletGroup {...bullet} actions={actions} />
                    </ul>
                </>;
            case "text":
                return <BulletText key={bullet.id} {...bullet} groupId={id} actions={actions} />;
            default: 
                throw new Error(`invalid bullet type : ${bullet.type}`);
        }
    });
}

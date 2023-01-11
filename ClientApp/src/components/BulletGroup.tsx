import { BulletText } from './BulletText';
import { ListGroup } from 'reactstrap';

export const BulletGroup = ({ id, bulletIds, actions }: any) => {
    
    return <>{
        (bulletIds as string[]).map(bulletId => {
            const bullet = actions.getBullet(bulletId);
            switch (bullet.type) {
                case "group":
                    return <>
                        <BulletText {...bullet} groupId={bullet.id} actions={actions} />
                        <ListGroup style={{ paddingLeft: 20 }} key={bullet.id}>
                            <BulletGroup {...bullet} actions={actions} />
                        </ListGroup>
                    </>;
                case "text":
                    return <BulletText key={bullet.id} {...bullet} groupId={id} actions={actions} />;
                default:
                    throw new Error(`invalid bullet type : ${bullet.type}`);
            }
        })
    }</>
}

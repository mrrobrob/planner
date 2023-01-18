import { BulletGroup } from './BulletGroup';
import { ListGroup } from 'reactstrap';
import { BulletText } from './BulletText';
import { LocalStorage } from './LocalStorage';
import { useEffect, useState } from 'react';
import { IStorage } from './BulletModels';
import { useParams } from 'react-router-dom';

export const BulletEditor = () => {

    const { rootContainerId } = useParams();

    if (!rootContainerId) {
        throw new Error("Root Container Not Found");
    }

    const [initialState, setInitialState] = useState<IStorage>({
        activeBulletId: rootContainerId,
        bullets: [
            {
                id: rootContainerId,
                type: "group",
                text: "",
                bulletIds: []
            }]
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const jsonResult = localStorage.getItem(`storage_${rootContainerId}`);

        if (jsonResult) {
            const result = JSON.parse(jsonResult);
            setInitialState(result);
        }
        
        setLoading(false);
    }, [rootContainerId]);

    if (loading) {
        return <p>Loading!</p>
    }

    return <LocalStorage rootContainerId={rootContainerId} initialState={initialState}>
        {({ rootBullet, actions }: any) =>
            <ListGroup>
                <BulletText {...rootBullet} groupId={rootBullet.id} actions={actions} />
                <ListGroup style={{ paddingLeft: 20 }} >
                    <BulletGroup groupId={rootBullet.id} {...rootBullet} actions={actions} />
                </ListGroup>
            </ListGroup>
        }
    </LocalStorage>
}

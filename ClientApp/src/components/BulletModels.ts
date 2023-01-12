export interface IBullet {
    id: string;
    type: "text" | "group";
    text: string;
    bulletIds: string[];
}

export interface IHasGroupId {
    groupId: string;
}

export interface IHasBulletActions {
    actions: IBulletActions
}

export interface IBulletActions {

    getActiveBulletId: () => string;
    setActiveBulletId: (id: string) => void;
    getBullet: (id: string) => IBullet;
    setBulletText: (id: string, text: string) => void;
    moveBulletAfter: (id: string, afterId: string) => void;
    addNewBulletAfter: (id: string) => void;
    makeBulletGroup: (id: string) => void;

}

export interface IStorage {
    activeBulletId: string,
    bullets: IBullet[]
}
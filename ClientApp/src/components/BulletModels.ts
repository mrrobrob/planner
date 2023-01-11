export interface IBullet {
    id: string,
    type: "text" | "group",
    text: string,
    bulletIds: string[];
}

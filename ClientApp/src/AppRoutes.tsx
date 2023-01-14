import { BulletEditor } from "./components/BulletEditor";

const AppRoutes = [
    {
        index: true,
        element: <BulletEditor />
    },
    {
        path: '/',
        element: <BulletEditor />
    }
];

export default AppRoutes;

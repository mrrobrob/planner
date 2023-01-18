import { BulletEditor } from "./components/BulletEditor";
import { PlanList } from "./components/PlanList";

const AppRoutes = [
    {
        index: true, 
        element: <PlanList />
    },
    {
        path: '/plan/:rootContainerId',
        element: <BulletEditor />
    }
];

export default AppRoutes;

import { BulletEditor } from "./components/BulletEditor";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/bulletEditor',
    element: <BulletEditor />
  },
];

export default AppRoutes;

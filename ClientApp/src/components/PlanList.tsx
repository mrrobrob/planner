import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "reactstrap"
import { IStorage } from "./BulletModels";
import { v4 as uuidv4 } from 'uuid';

interface Plan {
    id: string;
    name: string;
}

export const PlanList = () => {

    const [plans, setPlans] = useState<Plan[]>();
    const navigate = useNavigate();

    useEffect(() => {

        const plans: Plan[] = [];

        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);

            if (!key) {
                continue;
            }

            if (key.startsWith("storage_")) {
                const jsonResult = localStorage.getItem(key);

                if (!jsonResult) {
                    continue;
                }
                const result = JSON.parse(jsonResult) as IStorage;

                const id = key.substr(8); 
                const bullet = result.bullets.find(e => e.id === id);

                if (!bullet) {
                    continue;
                }

                plans.push({ id: id, name: bullet.text ?? "" });
            }
        }


        setPlans(plans);

    }, []);

    const createPlan = () => {
        const id = uuidv4();
        navigate(`/plan/${id}`);
    }

    const navigateTo = (id: string) => {
        navigate(`/plan/${id}`);
    }

    if (!plans) {
        return <p>Loading</p>
    }

    return <div>
        <Button onClick={createPlan}>Create Plan</Button>
        <h2>Plan List</h2>
        <ListGroup>
            {plans.map(plan => <ListGroupItem key={plan.id} onClick={() => navigateTo(plan.id)}>{plan.name}</ListGroupItem>)}
        </ListGroup>
    </div>
}
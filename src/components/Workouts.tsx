import { Table, Skeleton, Image, Paper } from "@mantine/core";
import { useGetWorkouts } from "../hooks/useGetWorkouts";
import { User, useGetMe } from "../hooks/useGetMe";
import workoutLogo from "../assets/workoutLogo.svg";

interface Workout {
  id: number;
  name: string;
  description?: string;
  user: User;
}

function Workouts() {
  const user = useGetMe();
  const { data: workouts, isLoading } = useGetWorkouts();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 100, height: "0px" }}>Treinos</h1>

        <Image src={workoutLogo} alt="Logo" width={800} />
      </div>
      <Skeleton visible={isLoading}>
        <Table verticalSpacing="xs" fontSize="md">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {workouts?.map((workout: Workout) => (
              <tr>
                <td>{workout.name}</td>
                <td>{workout.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Skeleton>
    </>
  );
}

export default Workouts;

import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Skeleton,
  Text,
} from "@mantine/core";
import workoutLogo from "../assets/workoutLogo.svg";
import { useGetWorkouts } from "../hooks/useGetWorkouts";
import CreateWorkout from "./buttons/CreateWorkout";
import { User, useGetMe } from "../hooks/useGetMe";

interface Workout {
  id: number;
  name: string;
  description?: string;
  user: User;
}

function Workouts() {
  const { data: workouts, isLoading } = useGetWorkouts();
  const user = useGetMe();
  const filteredWorkouts = workouts?.filter(
    (workout: Workout) => workout.user.id === user?.id
  );
  console.log(filteredWorkouts);
  console.log(user);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 100, height: "0px" }}>Treinos</h1>
        <Image src={workoutLogo} alt="Logo" width={800} />
      </div>
      <Skeleton visible={isLoading}>
        <CreateWorkout user={user!} open={false} />
        <Grid justify="center">
          {filteredWorkouts?.map((workout: Workout) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ width: "13rem" }}
            >
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{workout?.name}</Text>
                <Badge color="pink" variant="light">
                  On Sale
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                {workout?.description}
              </Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Ver treino
              </Button>
            </Card>
          ))}
        </Grid>
      </Skeleton>
    </>
  );
}

export default Workouts;

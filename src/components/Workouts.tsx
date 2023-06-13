import {
  Button,
  Card,
  Grid,
  Group,
  Image,
  Skeleton,
  Text,
  Menu,
} from "@mantine/core";
import workoutLogo from "../assets/workoutLogo.svg";
import { useGetMe } from "../hooks/useGetMe";
import { Workout, useGetWorkouts } from "../hooks/useGetWorkouts";
import GetWorkout from "./GetWorkout";
import CreateWorkout from "./buttons/CreateWorkout";
import UpdateWorkout from "./buttons/UpdateWorkout";
import { useState } from "react";
import DeleteWorkout from "./buttons/DeleteWorkout";

function Workouts() {
  const { data: workouts, isLoading } = useGetWorkouts();
  const user = useGetMe();
  const filteredWorkouts = workouts?.filter(
    (workout: Workout) => workout.user.id === user?.id
  );
  const [selectedWorkoutToUpdate, setSelectedWorkoutToUpdate] =
    useState<Workout | null>(null);
  const [selectedWorkoutToDelete, setSelectedWorkoutToDelete] =
    useState<Workout | null>(null);

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
              </Group>

              <Text size="sm" color="dimmed">
                {workout?.description}
              </Text>
              <br />

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button>Opções</Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Selecione uma: </Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      setSelectedWorkoutToUpdate(workout);
                    }}
                  >
                    Editar
                  </Menu.Item>
                  <Menu.Item
                    style={{ color: "red" }}
                    onClick={() => {
                      setSelectedWorkoutToDelete(workout);
                    }}
                  >
                    Deletar
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <GetWorkout user={user!} workout={workout} />
            </Card>
          ))}
        </Grid>
      </Skeleton>
      {selectedWorkoutToUpdate && (
        <UpdateWorkout
          open={!!selectedWorkoutToUpdate}
          close={() => {
            setSelectedWorkoutToUpdate(null);
          }}
          workout={selectedWorkoutToUpdate as any}
          user={user!}
        />
      )}
      {selectedWorkoutToDelete && (
        <DeleteWorkout
          open={!!selectedWorkoutToDelete}
          close={() => {
            setSelectedWorkoutToDelete(null);
          }}
          workout={selectedWorkoutToDelete as any}
          user={user!}
        />
      )}
    </>
  );
}

export default Workouts;

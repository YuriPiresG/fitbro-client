import {
  Button,
  Card,
  Grid,
  Group,
  Image,
  Menu,
  Skeleton,
  Text,
} from "@mantine/core";
import { useState } from "react";
import workoutLogo from "../assets/workoutLogo.svg";
import { useGetMe } from "../hooks/useGetMe";
import { Workout, useGetWorkouts } from "../hooks/workout/useGetWorkouts";
import GetWorkout from "./GetWorkout";
import CreateWorkout from "./buttons/CreateWorkout";
import DeleteWorkout from "./buttons/DeleteWorkout";
import UpdateWorkout from "./buttons/UpdateWorkout";

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
  const [selectedWorkoutToView, setSelectedWorkoutToView] =
    useState<Workout | null>(null);

  return (
    <>
      <div className="fade-in">
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
                style={{ width: "20rem", height: "16rem" }}
              >
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{workout?.name}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                  {workout?.description}
                </Text>
                <br />

                <Menu
                  position="right"
                  withArrow
                  arrowPosition="center"
                  transitionProps={{
                    transition: "rotate-right",
                    duration: 150,
                  }}
                  shadow="md"
                  width={150}
                >
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
                      onClick={() => {
                        setSelectedWorkoutToView(workout);
                      }}
                    >
                      Ver treino
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
            workout={selectedWorkoutToUpdate as Workout}
            user={user!}
          />
        )}
        {selectedWorkoutToDelete && (
          <DeleteWorkout
            open={!!selectedWorkoutToDelete}
            close={() => {
              setSelectedWorkoutToDelete(null);
            }}
            workout={selectedWorkoutToDelete as Workout}
            user={user!}
          />
        )}
        {selectedWorkoutToView && (
          <GetWorkout
            open={!!selectedWorkoutToView}
            close={() => {
              setSelectedWorkoutToView(null);
            }}
            workout={selectedWorkoutToView as Workout}
            user={user!}
          />
        )}
      </div>
    </>
  );
}

export default Workouts;

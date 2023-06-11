import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Skeleton,
  Text,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import workoutLogo from "../assets/workoutLogo.svg";
import { Workout, useGetWorkouts } from "../hooks/useGetWorkouts";
import CreateWorkout from "./buttons/CreateWorkout";
import { User, useGetMe } from "../hooks/useGetMe";
import { useState } from "react";

interface Exercise {
  id: number;
  name: string;
  repetitions: number;
  series: number;
  weight: number;
}

interface Props {
  user: User;
  workout: Workout;
}

function GetWorkout(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [checkedExercises, setCheckedExercises] = useState<number[]>([]);
  const toggleExercise = (exerciseId: number) => {
    if (checkedExercises.includes(exerciseId)) {
      setCheckedExercises((prev) => prev.filter((id) => id !== exerciseId));
    } else {
      setCheckedExercises((prev) => [...prev, exerciseId]);
    }
  };
  const isExerciseChecked = (exerciseId: number) => {
    return checkedExercises.includes(exerciseId);
  };
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={props.workout.name}
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Drawer.Body>
          {props.workout.exercises.map((exercise: Exercise) => (
            <Text
              key={exercise.id}
              td={isExerciseChecked(exercise.id) ? "line-through" : "none"}
            >
              <h1> {exercise.name} </h1>
              <h3>Repetições: {exercise.repetitions}</h3>
              <h3>Séries: {exercise.series}</h3>
              <h3>Peso: {exercise.weight}</h3>
              <Button onClick={() => toggleExercise(exercise.id)}>
                {isExerciseChecked(exercise.id) ? "Uncheck" : "Check"}
              </Button>
            </Text>
          ))}
        </Drawer.Body>
      </Drawer>
      <Group position="center">
        <Button onClick={open}>Open drawer</Button>
      </Group>
    </>
  );
}

export default GetWorkout;

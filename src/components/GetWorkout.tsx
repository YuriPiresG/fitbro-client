import { Button, Drawer, Text } from "@mantine/core";
import { useState } from "react";
import { User } from "../hooks/useGetMe";
import { Workout } from "../hooks/workout/useGetWorkouts";
import { Exercise } from "../hooks/exercise/useGetExercises";
import CreateExercise from "./buttons/CreateExercise";

interface Props {
  user: User;
  workout: Workout;
  open: boolean;
  close: () => void;
}

function GetWorkout(props: Props) {
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
        opened={props.open}
        onClose={props.close}
        title={props.workout.name}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        transitionProps={{
          transition: "rotate-left",
          duration: 150,
          timingFunction: "linear",
        }}
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
          <CreateExercise workout={props.workout} open />
        </Drawer.Body>
      </Drawer>
    </>
  );
}

export default GetWorkout;

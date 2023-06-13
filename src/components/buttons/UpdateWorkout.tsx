import {
  Button,
  Group,
  Modal,
  MultiSelect,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { TfiPlus } from "react-icons/tfi";
import { toast } from "react-toastify";
import { z } from "zod";
import { useGetExercises } from "../../hooks/workout/useGetExercises";
import { User } from "../../hooks/useGetMe";
import { useUpdateWorkout } from "../../hooks/workout/useUpdateWorkout";
import { Workout } from "../../hooks/useGetWorkouts";

const updateWorkoutSchema = z.object({
  name: z.string().min(3, { message: "Nome muito curto" }),
  description: z.string().optional(),
  userId: z.number(),
  exercisesId: z.array(z.string()),
});

type UpdateWorkoutSchema = z.infer<typeof updateWorkoutSchema>;

interface Props {
  workout: Workout;
  user: User;
  open: boolean;
  close: () => void;
}

function UpdateWorkout(props: Props) {
  const exercisesQuery = useGetExercises();
  const exercises = exercisesQuery.data ?? [];

  const { mutateAsync, isLoading } = useUpdateWorkout();
  const form = useForm<UpdateWorkoutSchema>({
    initialValues: {
      name: props.workout.name || "",
      description: props.workout.description || "",
      userId: props.user?.id,
      exercisesId: [""],
    },
    validate: zodResolver(updateWorkoutSchema),
  });

  const handleSubmit = async (workoutForm: UpdateWorkoutSchema) => {
    const formValues = {
      id: props.workout.id,
      name: workoutForm.name,
      description: workoutForm.description,
      userId: workoutForm.userId,
      exercisesId: workoutForm.exercisesId,
    };
    await mutateAsync(formValues);
    toast.success("Treino atualizado com sucesso!");
    handleClose();
  };
  function handleClose() {
    props.close();
    form.reset();
  }

  return (
    <>
      <Modal
        opened={props.open}
        onClose={handleClose}
        title="Atualizar um treino"
      >
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((workoutForm) => handleSubmit(workoutForm))}
          >
            <Stack spacing="xs">
              <TextInput
                label="Nome do treino"
                type="text"
                placeholder=""
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Descrição (Opcional)"
                type="text"
                placeholder="Treino de peito, ombro e tríceps"
                {...form.getInputProps("description")}
              />
              <MultiSelect
                label="Exercícios"
                placeholder="Selecione os exercícios"
                data={exercises.map((exercise) => ({
                  value: exercise.id.toString(),
                  label: exercise.name,
                }))}
                required
                maxDropdownHeight={200}
                searchable
                {...form.getInputProps("exercisesId")}
              />

              <Button color="blue" type="submit" loading={isLoading}>
                Atualizar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UpdateWorkout;

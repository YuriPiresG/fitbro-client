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
import { useGetExercises } from "../../hooks/useGetExercises";
import { User } from "../../hooks/useGetMe";
import { useUpdateWorkout } from "../../hooks/useUpdateWorkout";
import { Workout } from "../../hooks/useGetWorkouts";

const updateWorkoutSchema = z.object({
  name: z.string().min(3, { message: "Nome muito curto" }),
  description: z.string().optional(),
  userId: z.number(),
  exercisesId: z.array(z.number()),
});

type UpdateWorkoutSchema = z.infer<typeof updateWorkoutSchema>;

interface Props {
  workout: Workout;
  user: User;
  open: boolean;
}

function UpdateWorkout(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const exercisesQuery = useGetExercises();

  const { mutateAsync, isLoading } = useUpdateWorkout();
  const handleSubmit = async (workoutForm: UpdateWorkoutSchema) => {
    const formValues: UpdateWorkoutSchema = {
      ...workoutForm,
    };
    await mutateAsync(formValues);
    toast.success("Treino atualizado com sucesso!");
    close();
  };
  const form = useForm<UpdateWorkoutSchema>({
    initialValues: {
      name: props.workout.name || "",
      description: props.workout.description || "",
      userId: props.user?.id,
      exercisesId: [],
    },
    validate: zodResolver(updateWorkoutSchema),
  });

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Atualizar um treino">
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((createWorkoutForm) =>
              handleSubmit(createWorkoutForm)
            )}
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
                multiple
                data={
                  exercisesQuery.data?.map((exercise) => ({
                    value: exercise.id.toString(),
                    label: exercise.name,
                  })) || []
                }
                {...form.getInputProps("exercisesId")}
              />

              <Button color="blue" type="submit" loading={isLoading}>
                Atualizar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green" style={{ marginRight: "100rem" }}>
          <TfiPlus size={30} />
        </Button>
      </Group>
    </>
  );
}
export default UpdateWorkout;

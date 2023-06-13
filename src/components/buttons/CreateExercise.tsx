import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { TfiPlus } from "react-icons/tfi";
import { toast } from "react-toastify";
import { z } from "zod";
import { Workout } from "../../hooks/workout/useGetWorkouts";
import { useCreateExercise } from "../../hooks/exercise/useCreateExercise";

const createExerciseSchema = z.object({
  name: z.string(),
  repetitions: z.number(),
  series: z.number(),
  weight: z.number(),
  workoutId: z.number(),
});

type CreateExerciseSchema = z.infer<typeof createExerciseSchema>;

interface Props {
  workout: Workout;
  open: boolean;
}

function CreateExercise(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync, isLoading } = useCreateExercise();
  const form = useForm<CreateExerciseSchema>({
    initialValues: {
      name: "",
      repetitions: 0,
      series: 0,
      weight: 0,
      workoutId: props.workout?.id,
    },
    validate: zodResolver(createExerciseSchema),
  });
  const handleSubmit = async (exerciseForm: CreateExerciseSchema) => {
    const formValues: CreateExerciseSchema = {
      name: exerciseForm.name,
      repetitions: exerciseForm.repetitions,
      series: exerciseForm.series,
      weight: exerciseForm.weight,
      workoutId: exerciseForm.workoutId,
    };
    await mutateAsync(formValues);
    toast.success("Exercício adicionado com sucesso!");
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title="Adicionar um exercício"
      >
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((exerciseForm) =>
              handleSubmit(exerciseForm)
            )}
          >
            <Stack spacing="xs">
              <TextInput
                label="Nome do exercício"
                type="text"
                placeholder="Supino reto"
                {...form.getInputProps("name")}
              />
              <NumberInput
                label="Repetições"
                placeholder="8"
                {...form.getInputProps("repetitions")}
              />
              <NumberInput
                label="Séries"
                placeholder="3"
                {...form.getInputProps("series")}
              />
              <NumberInput
                label="Peso em kg"
                placeholder="50"
                {...form.getInputProps("weight")}
              />
              <input type="hidden" {...form.getInputProps("workoutId")} />
              <Button color="green" type="submit" loading={isLoading}>
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green">
          <TfiPlus size={30} />
        </Button>
      </Group>
    </>
  );
}
export default CreateExercise;

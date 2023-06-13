import { Button, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Exercise } from "../../hooks/exercise/useGetExercises";
import { useUpdateExercise } from "../../hooks/exercise/useUpdateExecise";

const updateExerciseSchema = z.object({
  name: z.string(),
  repetitions: z.number(),
  series: z.number(),
  weight: z.number(),
});

type UpdateExerciseSchema = z.infer<typeof updateExerciseSchema>;

interface Props {
  exercise: Exercise;
  open: boolean;
  close: () => void;
}

function UpdateExercise(props: Props) {
  const { mutateAsync, isLoading } = useUpdateExercise();
  const form = useForm<UpdateExerciseSchema>({
    initialValues: {
      name: props.exercise.name || "",
      repetitions: props.exercise.repetitions || 0,
      series: props.exercise.series || 0,
      weight: props.exercise.weight || 0,
    },
    validate: zodResolver(updateExerciseSchema),
  });
  const handleSubmit = async (exerciseForm: UpdateExerciseSchema) => {
    const formValues = {
      id: props.exercise.id,
      name: exerciseForm.name,
      repetitions: exerciseForm.repetitions,
      series: exerciseForm.series,
      weight: exerciseForm.weight,
    };
    await mutateAsync(formValues);
    toast.success("Exercício atualizado com sucesso!");
    handleClose();
  };

  const handleClose = () => {
    props.close();
    form.reset();
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={handleClose}
        title="Atualizar um exercício"
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
export default UpdateExercise;

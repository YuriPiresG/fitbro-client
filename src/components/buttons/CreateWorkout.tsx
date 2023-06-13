import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { TfiPlus } from "react-icons/tfi";
import { toast } from "react-toastify";
import { z } from "zod";
import { User } from "../../hooks/useGetMe";
import { useCreateWorkout } from "../../hooks/workout/useCreateWorkout";

const createWorkoutSchema = z.object({
  name: z.string().nonempty({ message: "Nome não pode estar vazio" }),
  description: z.string().optional(),
  userId: z.number(),
  exercisesId: z.array(z.string()),
});

type CreateWorkoutSchema = z.infer<typeof createWorkoutSchema>;

interface Props {
  user: User;
  open: boolean;
}

function CreateWorkout(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync, isLoading } = useCreateWorkout();
  const form = useForm<CreateWorkoutSchema>({
    initialValues: {
      name: "",
      description: "",
      userId: props.user?.id,
      exercisesId: [""],
    },
    validate: zodResolver(createWorkoutSchema),
  });
  const handleSubmit = async (workoutForm: CreateWorkoutSchema) => {
    const formValues: CreateWorkoutSchema = {
      name: workoutForm.name,
      description: workoutForm.description,
      userId: workoutForm.userId,
      exercisesId: workoutForm.exercisesId,
    };
    await mutateAsync(formValues);
    toast.success("Treino criado com sucesso!");
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar um treino">
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((workoutForm) => handleSubmit(workoutForm))}
          >
            <Stack spacing="xs">
              <TextInput
                label="Nome do treino"
                type="text"
                placeholder="Push"
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Descrição (Opcional)"
                type="text"
                placeholder="Treino de peito, ombro e tríceps"
                {...form.getInputProps("description")}
              />

              <Button color="green" type="submit" loading={isLoading}>
                Criar
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
export default CreateWorkout;

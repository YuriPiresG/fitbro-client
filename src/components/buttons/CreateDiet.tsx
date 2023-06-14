import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { TfiPlus } from "react-icons/tfi";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateDiet } from "../../hooks/diet/useCreateDiet";
import { User } from "../../hooks/useGetMe";

const createDietSchema = z.object({
  name: z.string().nonempty({ message: "Nome não pode estar vazio" }),
  guide: z.string().nonempty({ message: "Instruções não pode estar vazio" }),
  userId: z.number(),
});

interface Props {
  user: User;
  open: boolean;
}

type CreateDietSchema = z.infer<typeof createDietSchema>;

function CreateDiet(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync, isLoading } = useCreateDiet();
  const form = useForm<CreateDietSchema>({
    initialValues: {
      name: "",
      guide: "",
      userId: props.user?.id,
    },
    validate: zodResolver(createDietSchema),
  });
  const handleSubmit = async (dietForm: CreateDietSchema) => {
    const formValues: CreateDietSchema = {
      name: dietForm.name,
      guide: dietForm.guide,
      userId: dietForm.userId,
    };

    await mutateAsync(formValues);
    toast.success("Receita adicionada com sucesso!");
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
        title="Adicionar uma receita"
      >
        <Modal.Body>
          <form onSubmit={form.onSubmit((dietForm) => handleSubmit(dietForm))}>
            <Stack spacing="xs">
              <TextInput
                label="Nome da receita"
                type="text"
                placeholder="Brigadeiro de Whey"
                {...form.getInputProps("name")}
              />
              <Textarea
                label="Instruções"
                placeholder="Misture tudo e coloque no microondas por 2 minutos"
                {...form.getInputProps("guide")}
              />
              <input type="hidden" {...form.getInputProps("userId")} />

              <Button color="green" type="submit" loading={isLoading}>
                Criar receita
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green">
          Adicione uma receita
          <TfiPlus size={"1.3rem"} />
        </Button>
      </Group>
    </>
  );
}
export default CreateDiet;

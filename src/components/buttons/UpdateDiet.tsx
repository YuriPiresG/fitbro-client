import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Diet } from "../../hooks/diet/useGetDiet";
import { useUpdateDiet } from "../../hooks/diet/useUpdateDiet";

const updateDietSchema = z.object({
  name: z.string().min(3, { message: "Nome muito curto" }),
  guide: z.string().optional(),
});

type UpdateDietSchema = z.infer<typeof updateDietSchema>;

interface Props {
  diet: Diet;

  open: boolean;
  close: () => void;
}

function UpdateDiet(props: Props) {
  const { mutateAsync, isLoading } = useUpdateDiet();
  const form = useForm<UpdateDietSchema>({
    initialValues: {
      name: props.diet.name || "",
      guide: props.diet.guide || "",
    },
    validate: zodResolver(updateDietSchema),
  });

  const handleSubmit = async (dietForm: UpdateDietSchema) => {
    const formValues = {
      id: props.diet.id,
      name: dietForm.name,
      guide: dietForm.guide,
    };
    await mutateAsync(formValues);
    toast.success("Receita atualizado com sucesso!");
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
        title="Atualizar uma receita"
      >
        <Modal.Body>
          <form onSubmit={form.onSubmit((dietForm) => handleSubmit(dietForm))}>
            <Stack spacing="xs">
              <TextInput
                label="Nome do treino"
                type="text"
                placeholder="Omelete de frango"
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Descrição (Opcional)"
                type="text"
                placeholder="Cozinhe bem por 15 min em 200ºC"
                {...form.getInputProps("guide")}
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
export default UpdateDiet;

import { Button, Group, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { TfiPlus } from "react-icons/tfi";
import { toast } from "react-toastify";
import { z } from "zod";
import { Diet } from "../../hooks/diet/useGetDiet";
import { useCreateIngredient } from "../../hooks/ingredients/useCreateIngredient";

const createIngredientSchema = z.object({
  name: z.string().nonempty({ message: "Nome não pode estar vazio" }),
  calories: z.number().gte(0, { message: "Caloria não pode ser negativo" }),
  protein: z.number().gte(0, { message: "Proteína não pode ser negativo" }),
  carbs: z.number().gte(0, { message: "Carboidrato não pode ser negativo" }),
  dietId: z.number().gte(0, { message: "DietId não pode ser negativo" }),
});

interface Props {
  diet: Diet;
  open: boolean;
}

type CreateIngredientSchema = z.infer<typeof createIngredientSchema>;

function CreateIngredient(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync, isLoading } = useCreateIngredient();
  const form = useForm<CreateIngredientSchema>({
    initialValues: {
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      dietId: props.diet.id,
    },
    validate: zodResolver(createIngredientSchema),
  });
  const handleSubmit = async (ingredientForm: CreateIngredientSchema) => {
    const formValues: CreateIngredientSchema = {
      name: ingredientForm.name,
      calories: ingredientForm.calories,
      protein: ingredientForm.protein,
      carbs: ingredientForm.carbs,
      dietId: ingredientForm.dietId,
    };

    await mutateAsync(formValues);
    toast.success("Ingrediente adicionado com sucesso!");
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Crie um ingrediente!">
        <Modal.Body>
          <form onSubmit={form.onSubmit((dietForm) => handleSubmit(dietForm))}>
            <Stack spacing="xs">
              <TextInput
                label="Nome do ingrediente"
                type="text"
                placeholder="Ovo"
                {...form.getInputProps("name")}
              />
              <p>Coloque as quantidades totais!</p>
              <NumberInput
                label="Calorias"
                type="number"
                placeholder="100"
                {...form.getInputProps("calories")}
              />
              <NumberInput
                label="Proteína"
                type="number"
                placeholder="13"
                {...form.getInputProps("protein")}
              />
              <NumberInput
                label="Carboidratos"
                type="number"
                placeholder="100"
                {...form.getInputProps("carbs")}
              />

              <input type="hidden" {...form.getInputProps("dietId")} />

              <Button color="green" type="submit" loading={isLoading}>
                Criar ingrediente
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green">
          Adicione um ingrediente
          <TfiPlus size={"1rem"} />
        </Button>
      </Group>
    </>
  );
}
export default CreateIngredient;

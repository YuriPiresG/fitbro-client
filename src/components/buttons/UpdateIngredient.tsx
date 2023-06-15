import { Button, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Ingredient } from "../../hooks/ingredients/useGetIngredients";
import { useUpdateIngredient } from "../../hooks/ingredients/useUpdateIngredient";

const updateIngredientSchema = z.object({
  id: z.number().gte(0, { message: "Id não pode ser negativo" }),
  name: z.string().nonempty({ message: "Nome não pode estar vazio" }),
  calories: z.number().gte(0, { message: "Caloria não pode ser negativo" }),
  protein: z.number().gte(0, { message: "Proteína não pode ser negativo" }),
  carbs: z.number().gte(0, { message: "Carboidrato não pode ser negativo" }),
});
type UpdateIngredientSchema = z.infer<typeof updateIngredientSchema>;

interface Props {
  ingredient: Ingredient;
  open: boolean;
  close: () => void;
}

function UpdateIngredient(props: Props) {
  const { mutateAsync, isLoading } = useUpdateIngredient();
  const form = useForm<UpdateIngredientSchema>({
    initialValues: {
      id: props.ingredient.id,
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
    },
    validate: zodResolver(updateIngredientSchema),
  });
  const handleSubmit = async (ingredientForm: UpdateIngredientSchema) => {
    const formValues: UpdateIngredientSchema = {
      id: props.ingredient.id,
      name: ingredientForm.name,
      calories: ingredientForm.calories,
      protein: ingredientForm.protein,
      carbs: ingredientForm.carbs,
    };
    await mutateAsync(formValues);
    toast.success("Ingrediente atualizado com sucesso!");
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
        title="Atualizar um ingrediente"
      >
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
                Atualizar ingrediente
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UpdateIngredient;

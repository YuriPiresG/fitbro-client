import { Button, Modal, Stack } from "@mantine/core";
import { toast } from "react-toastify";
import { useDeleteIngredient } from "../../hooks/ingredients/useDeleteIngredient";
import { Ingredient } from "../../hooks/ingredients/useGetIngredients";

interface Props {
  ingredient: Ingredient;
  open: boolean;
  close: () => void;
}

function DeleteIngredient(props: Props) {
  const ingredientId = props.ingredient.id;
  const { mutateAsync, isLoading } = useDeleteIngredient();
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutateAsync(ingredientId);
      toast.success("Ingrediente deletado com sucesso!");
      props.close();
    } catch (error) {
      toast.error("Erro ao deletar ingrediente!");
    }
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar o exercício ${props.ingredient?.name}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                {`Sim, quero deletar ${props.ingredient?.name}`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default DeleteIngredient;

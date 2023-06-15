import { Button, Modal, Stack } from "@mantine/core";
import { toast } from "react-toastify";
import { useDeleteDiet } from "../../hooks/diet/useDeleteDiet";
import { Diet } from "../../hooks/diet/useGetDiet";

interface Props {
  diet: Diet;
  open: boolean;
  close: () => void;
}

function DeleteDiet(props: Props) {
  const exerciseId = props.diet.id;
  const { mutateAsync, isLoading } = useDeleteDiet();
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutateAsync(exerciseId);
      toast.success("Receita deletada com sucesso!");
      props.close();
    } catch (error) {
      toast.error("Erro ao deletar receita!");
    }
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar a receita ${props.diet?.name}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                {`Sim, quero deletar ${props.diet?.name}`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default DeleteDiet;

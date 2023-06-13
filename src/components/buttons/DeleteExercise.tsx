import { Button, Modal, Stack } from "@mantine/core";
import { toast } from "react-toastify";
import { useDeleteExercise } from "../../hooks/exercise/useDeleteExercise";
import { Exercise } from "../../hooks/exercise/useGetExercises";

interface Props {
  exercise: Exercise;
  open: boolean;
  close: () => void;
}

function DeleteExercise(props: Props) {
  const exerciseId = props.exercise.id;
  const { mutateAsync, isLoading } = useDeleteExercise();
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutateAsync(exerciseId);
      toast.success("Exercício deletado com sucesso!");
      props.close();
    } catch (error) {
      toast.error("Erro ao deletar exercício!");
    }
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar o exercício ${props.exercise?.name}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                {`Sim, quero deletar ${props.exercise?.name}`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default DeleteExercise;

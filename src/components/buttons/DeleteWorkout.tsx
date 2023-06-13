import { Button, Modal, Stack } from "@mantine/core";
import { toast } from "react-toastify";
import { User } from "../../hooks/useGetMe";
import { Workout } from "../../hooks/workout/useGetWorkouts";
import { useDeleteWorkout } from "../../hooks/workout/useDeleteWorkout";

interface Props {
  workout: Workout;
  user: User;
  open: boolean;
  close: () => void;
}

function DeleteWorkout(props: Props) {
  const workoutId = props.workout.id;
  const { mutateAsync, isLoading } = useDeleteWorkout();
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutateAsync(workoutId);
      toast.success("Treino deletado com sucesso!");
      props.close();
    } catch (error) {
      toast.error("Erro ao deletar treino!");
    }
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar o treino ${props.workout?.name}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                {`Sim, tenho certeza que desejo deletar o treino ${props.workout?.name}`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default DeleteWorkout;

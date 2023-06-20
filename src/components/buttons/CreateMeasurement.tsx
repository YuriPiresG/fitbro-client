import {
  Button,
  Center,
  Group,
  Modal,
  NumberInput,
  Stack,
} from "@mantine/core";

import { DateInput, DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { TfiPlus } from "react-icons/tfi";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateMeasurement } from "../../hooks/measurements/useCreateMeasurement";
import { User } from "../../hooks/useGetMe";

const createMeasurementSchema = z.object({
  date: z.string().or(z.date()),
  userId: z.number(),
  weight: z.number(),
  height: z.number(),
  bodyFat: z.number(),
  armL: z.number(),
  armR: z.number(),
  forearmL: z.number(),
  forearmR: z.number(),
  chest: z.number(),
  waist: z.number(),
  hips: z.number(),
  thighL: z.number(),
  thighR: z.number(),
  calfL: z.number(),
  calfR: z.number(),
  back: z.number(),
  shoulders: z.number(),
});

type CreateMeasurementSchema = z.infer<typeof createMeasurementSchema>;

interface Props {
  user: User;
  open: boolean;
}

function CreateMeasurement(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync, isLoading } = useCreateMeasurement();
  const form = useForm<CreateMeasurementSchema>({
    initialValues: {
      date: new Date(),
      userId: props.user?.id,
      weight: 0,
      height: 0,
      bodyFat: 0,
      armL: 0,
      armR: 0,
      forearmL: 0,
      forearmR: 0,
      chest: 0,
      waist: 0,
      hips: 0,
      thighL: 0,
      thighR: 0,
      calfL: 0,
      calfR: 0,
      back: 0,
      shoulders: 0,
    },
    validate: zodResolver(createMeasurementSchema),
  });
  const handleSubmit = async (measurementForm: CreateMeasurementSchema) => {
    const formValues = {
      userId: measurementForm.userId,
      date: measurementForm.date,
      weight: measurementForm.weight,
      height: measurementForm.height,
      bodyFat: measurementForm.bodyFat,
      armL: measurementForm.armL,
      armR: measurementForm.armR,
      forearmL: measurementForm.forearmL,
      forearmR: measurementForm.forearmR,
      chest: measurementForm.chest,
      waist: measurementForm.waist,
      hips: measurementForm.hips,
      thighL: measurementForm.thighL,
      thighR: measurementForm.thighR,
      calfL: measurementForm.calfL,
      calfR: measurementForm.calfR,
      back: measurementForm.back,
      shoulders: measurementForm.shoulders,
    };
    console.log("Form submitted with values:", formValues);
    await mutateAsync(formValues);
    toast.success("Medida adicionada com sucesso!");
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Adicionar medidas">
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((exerciseForm) =>
              handleSubmit(exerciseForm)
            )}
          >
            <DateInput
              label="Date input"
              placeholder="Date input"
              maw={400}
              mx="auto"
              required
              {...form.getInputProps("date")}
              clearable
            />
            <NumberInput
              label="Peso"
              precision={2}
              placeholder="Peso"
              required
              {...form.getInputProps("weight")}
            />
            <NumberInput
              label="Altura"
              precision={2}
              placeholder="Altura"
              required
              {...form.getInputProps("height")}
            />
            <NumberInput
              precision={2}
              label="Gordura corporal (em %)"
              placeholder="Gordura corporal"
              required
              {...form.getInputProps("bodyFat")}
            />
            <NumberInput
              precision={2}
              label="Braço esquerdo"
              placeholder="Braço esquerdo"
              required
              {...form.getInputProps("armL")}
            />
            <NumberInput
              precision={2}
              label="Braço direito"
              placeholder="Braço direito"
              required
              {...form.getInputProps("armR")}
            />
            <NumberInput
              precision={2}
              label="Antebraço esquerdo"
              placeholder="Antebraço esquerdo"
              required
              {...form.getInputProps("forearmL")}
            />
            <NumberInput
              precision={2}
              label="Antebraço direito"
              placeholder="Antebraço direito"
              required
              {...form.getInputProps("forearmR")}
            />
            <NumberInput
              precision={2}
              label="Peitoral"
              placeholder="Peitoral"
              required
              {...form.getInputProps("chest")}
            />
            <NumberInput
              precision={2}
              label="Cintura"
              placeholder="Cintura"
              required
              {...form.getInputProps("waist")}
            />
            <NumberInput
              precision={2}
              label="Quadril"
              placeholder="Quadril"
              required
              {...form.getInputProps("hips")}
            />
            <NumberInput
              precision={2}
              label="Coxa esquerda"
              placeholder="Coxa esquerda"
              required
              {...form.getInputProps("thighL")}
            />
            <NumberInput
              precision={2}
              label="Coxa direita"
              placeholder="Coxa direita"
              required
              {...form.getInputProps("thighR")}
            />
            <NumberInput
              precision={2}
              label="Panturrilha esquerda"
              placeholder="Panturrilha esquerda"
              required
              {...form.getInputProps("calfL")}
            />
            <NumberInput
              precision={2}
              label="Panturrilha direita"
              placeholder="Panturrilha direita"
              required
              {...form.getInputProps("calfR")}
            />
            <NumberInput
              precision={2}
              label="Costas"
              placeholder="Costas"
              required
              {...form.getInputProps("back")}
            />
            <NumberInput
              precision={2}
              label="Ombros"
              placeholder="Ombros"
              required
              {...form.getInputProps("shoulders")}
            />
            <Stack spacing="xs">
              <Button color="green" type="submit" loading={isLoading}>
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green">
          <TfiPlus size={30} />
        </Button>
      </Group>
    </>
  );
}
export default CreateMeasurement;

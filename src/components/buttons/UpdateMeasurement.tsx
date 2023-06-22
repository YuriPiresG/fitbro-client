import { Button, Modal, NumberInput, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Measurement } from "../../hooks/measurements/useGetMeasurements";
import { useUpdateMeasurement } from "../../hooks/measurements/useUpdateMeasurement";
import { User } from "../../hooks/useGetMe";

const updateMeasurementSchema = z.object({
  date: z.string().or(z.date()),
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

type UpdateMeasurementSchema = z.infer<typeof updateMeasurementSchema>;

interface Props {
  measurement: Measurement;
  user: User;
  open: boolean;
  close: () => void;
}

function UpdateMeasurement(props: Props) {
  const { mutateAsync, isLoading } = useUpdateMeasurement();
  const form = useForm<UpdateMeasurementSchema>({
    initialValues: {
      date: "",
      weight: props.measurement.weight,
      height: props.measurement.height,
      bodyFat: props.measurement.bodyFat,
      armL: props.measurement.armL,
      armR: props.measurement.armR,
      forearmL: props.measurement.forearmL,
      forearmR: props.measurement.forearmR,
      chest: props.measurement.chest,
      waist: props.measurement.waist,
      hips: props.measurement.hips,
      thighL: props.measurement.thighL,
      thighR: props.measurement.thighR,
      calfL: props.measurement.calfL,
      calfR: props.measurement.calfR,
      back: props.measurement.back,
      shoulders: props.measurement.shoulders,
    },
    validate: zodResolver(updateMeasurementSchema),
  });

  const handleSubmit = async (measurementForm: UpdateMeasurementSchema) => {
    const formValues = {
      id: props.measurement.id,
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
    await mutateAsync(formValues);
    toast.success("Medidas atualizadas com sucesso!");
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
        title="Atualizar medidas"
      >
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((measurementForm) =>
              handleSubmit(measurementForm)
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
                Atualizar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UpdateMeasurement;

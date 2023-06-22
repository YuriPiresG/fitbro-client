import {
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Menu,
  Skeleton,
  Text,
} from "@mantine/core";
import measurement from "../assets/measurement.svg";
import {
  Measurement,
  useGetMeasurements,
} from "../hooks/measurements/useGetMeasurements";
import { useGetMe } from "../hooks/useGetMe";
import CreateMeasurement from "./buttons/CreateMeasurement";
import { useState } from "react";
import UpdateMeasurement from "./buttons/UpdateMeasurement";
function Measurements() {
  const { data: measurements, isLoading } = useGetMeasurements();
  const user = useGetMe();
  const filteredMeasurements = measurements?.filter(
    (measurement: Measurement) => measurement.user.id === user?.id
  );
  const [selectedMeasurementToUpdate, setSelectedMeasurementToUpdate] =
    useState<Measurement | null>(null);
  // const [selectedWorkoutToDelete, setSelectedWorkoutToDelete] =
  //   useState<Workout | null>(null);
  // const [selectedWorkoutToView, setSelectedWorkoutToView] =
  //   useState<Workout | null>(null);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Image src={measurement} alt="measurement" style={{ width: "50rem" }} />
        <div>
          <h1
            style={{
              fontSize: 100,
              aspectRatio: "auto",
              marginRight: "10rem",
            }}
          >
            Medidas
          </h1>
          <h3>
            Esta área é dedicada ao acompanhamento de suas medidas corporais!
            <br />
            Você poderá acompanhar seu progresso e visualizar seus resultados!
            <br />
            Comece criando uma medida abaixo!
          </h3>
        </div>
      </div>
      <Divider />
      <br />
      <CreateMeasurement user={user!} open={false} />
      <br />
      <Skeleton visible={isLoading}>
        <Grid justify="center">
          {filteredMeasurements?.map((measurement: Measurement) => (
            <Card
              key={measurement.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ width: "15rem", height: "auto" }}
            >
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Data: {measurement.date}</Text>
              </Group>

              <Text size="sm" color="dimmed">
                Peso: {measurement?.weight}kg
              </Text>
              <br />

              <Menu
                position="right"
                withArrow
                arrowPosition="center"
                transitionProps={{
                  transition: "rotate-right",
                  duration: 150,
                }}
                shadow="md"
                width={150}
              >
                <Menu.Target>
                  <Button>Opções</Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Selecione uma: </Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      setSelectedMeasurementToUpdate(measurement);
                    }}
                  >
                    Editar
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      alert("Ver");
                    }}
                  >
                    Ver/Adicionar Ingredientes
                  </Menu.Item>
                  <Menu.Item
                    style={{ color: "red" }}
                    onClick={() => {
                      alert("Deletar");
                    }}
                  >
                    Deletar
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Card>
          ))}
        </Grid>
      </Skeleton>
      {selectedMeasurementToUpdate && (
        <UpdateMeasurement
          open={!!selectedMeasurementToUpdate}
          close={() => {
            setSelectedMeasurementToUpdate(null);
          }}
          measurement={selectedMeasurementToUpdate as Measurement}
          user={user!}
        />
      )}
    </>
  );
}

export default Measurements;

import {
  Button,
  Card,
  Group,
  Image,
  Menu,
  Text,
  Skeleton,
  Grid,
} from "@mantine/core";
import measurement from "../assets/measurement.svg";
import {
  Measurement,
  useGetMeasurements,
} from "../hooks/measurements/useGetMeasurements";
import { useGetMe } from "../hooks/useGetMe";
import CreateMeasurement from "./buttons/CreateMeasurement";
function Measurements() {
  const { data: measurements, isLoading } = useGetMeasurements();
  const user = useGetMe();
  const filteredMeasurements = measurements?.filter(
    (measurement: Measurement) => measurement.user.id === user?.id
  );
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
            Esta área é dedicada ao acompanhamento de suas medidas corporais!{" "}
            <br />
            Você poderá acompanhar seu progresso e visualizar seus resultados!{" "}
            <br />
            Comece criando uma medida abaixo!
          </h3>
        </div>
      </div>
      <CreateMeasurement user={user!} open={false} />
      <Skeleton visible={isLoading}>
        <Grid justify="center">
          {filteredMeasurements?.map((measurement: Measurement) => (
            <Card
              key={measurement.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ width: "20rem", height: "16rem" }}
            >
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{measurement.date}</Text>
              </Group>

              <Text size="sm" color="dimmed">
                {measurement?.user?.username}
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
                      alert("Editar");
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
    </>
  );
}

export default Measurements;

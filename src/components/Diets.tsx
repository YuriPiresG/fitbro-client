import {
  Button,
  Card,
  Grid,
  Group,
  Image,
  Menu,
  Skeleton,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import dietLogo from "../assets/dietLogo.svg";
import { Diet, useGetDiet } from "../hooks/diet/useGetDiet";
import { useGetMe } from "../hooks/useGetMe";
import GetDiet from "./GetDiet";
import CreateDiet from "./buttons/CreateDiet";
import DeleteDiet from "./buttons/DeleteDiet";
import UpdateDiet from "./buttons/UpdateDiet";
IoSettingsOutline;
function Diets() {
  const { data: diets, isLoading } = useGetDiet();
  const user = useGetMe();
  const filteredDiets = diets?.filter(
    (diet: Diet) => diet.user.id === user?.id
  );
  const [selectedDietToUpdate, setSelectedDietToUpdate] = useState<Diet | null>(
    null
  );
  const [selectedDietToDelete, setSelectedDietToDelete] = useState<Diet | null>(
    null
  );
  const [selectedDietToView, setSelectedDietToView] = useState<Diet | null>(
    null
  );

  return (
    <>
      <div className="fade-in">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Image src={dietLogo} alt="Logo" width={500} />
          <div>
            <h1
              style={{
                fontSize: 100,
                aspectRatio: "auto",
                marginRight: "10rem",
              }}
            >
              Receitas
            </h1>
            <h3>
              Utilizando o FitBro você poderá salvar suas receitas aqui! <br />{" "}
              Podendo também conferir as calorias, proteínas e carbo!
            </h3>
          </div>
        </div>
        <Skeleton visible={isLoading}>
          <CreateDiet open={false} user={user!} />
          <Grid justify="center">
            {filteredDiets?.map((diet: Diet) => (
              <Card
                key={diet.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ width: "20rem", height: "16rem" }}
              >
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{diet?.name}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                  {diet?.guide}
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
                        setSelectedDietToUpdate(diet);
                      }}
                    >
                      Editar
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        setSelectedDietToView(diet);
                      }}
                    >
                      Ver/Adicionar Ingredientes
                    </Menu.Item>
                    <Menu.Item
                      style={{ color: "red" }}
                      onClick={() => {
                        setSelectedDietToDelete(diet);
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

        {selectedDietToView && (
          <GetDiet
            open={!!selectedDietToView}
            close={() => {
              setSelectedDietToView(null);
            }}
            diet={selectedDietToView as Diet}
            user={user!}
          />
        )}
        {selectedDietToDelete && (
          <DeleteDiet
            open={!!selectedDietToDelete}
            close={() => {
              setSelectedDietToDelete(null);
            }}
            diet={selectedDietToDelete as Diet}
          />
        )}
        {selectedDietToUpdate && (
          <UpdateDiet
            open={!!selectedDietToUpdate}
            close={() => {
              setSelectedDietToUpdate(null);
            }}
            diet={selectedDietToUpdate as Diet}
          />
        )}
      </div>
    </>
  );
}

export default Diets;

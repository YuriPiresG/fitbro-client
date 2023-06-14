import {
  Button,
  Grid,
  Group,
  Image,
  Menu,
  Skeleton,
  Text,
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Divider,
} from "@mantine/core";
import { useState } from "react";
import dietLogo from "../assets/dietLogo.svg";
import { useGetMe } from "../hooks/useGetMe";
import { Diet, useGetDiet } from "../hooks/diet/useGetDiet";
IoSettingsOutline;
import { IoSettingsOutline } from "react-icons/io5";
function Diets() {
  const { data: diets, isLoading } = useGetDiet();
  const user = useGetMe();
  const filteredDiets = diets?.filter(
    (diet: Diet) => diet.user.id === user?.id
  );

  function AccordionControl(props: AccordionControlProps) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Accordion.Control {...props} />
        <ActionIcon size="xl">
          <Menu
            position="left"
            withArrow
            arrowPosition="center"
            transitionProps={{
              transition: "rotate-left",
              duration: 150,
            }}
            shadow="md"
            width={150}
          >
            <Menu.Target>
              <Button variant="subtle">
                <IoSettingsOutline />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Selecione uma: </Menu.Label>
              <Menu.Item
                onClick={() => {
                  alert("editar");
                }}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  {
                    alert("Ver");
                  }
                }}
              >
                Ver treino
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
        </ActionIcon>
      </Box>
    );
  }
  return (
    <>
      <div className="fade-in">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Image src={dietLogo} alt="Logo" width={500} />
          <h1 style={{ fontSize: 100, height: "0px", marginRight: "10rem" }}>
            Receitas
          </h1>
        </div>
        <Skeleton visible={isLoading}>
          <Accordion variant="separated" radius="xs" defaultValue="diet">
            {filteredDiets?.map((diet: Diet) => (
              <>
                <Divider />
                <Accordion.Item value={diet.name}>
                  <AccordionControl
                    style={{ fontSize: "3rem", backgroundColor: "" }}
                  >
                    {diet.name}
                  </AccordionControl>
                  <Accordion.Panel>{diet.guide}</Accordion.Panel>
                </Accordion.Item>
                <Divider />
              </>
            ))}
          </Accordion>
        </Skeleton>
      </div>
    </>
  );
}

export default Diets;

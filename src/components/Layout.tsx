import {
  AppShell,
  Avatar,
  Button,
  Flex,
  Header,
  Navbar,
  Text,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { useHome } from "../hooks/useHome";
import { useLogout } from "../hooks/useLogout";
import { useUser } from "../hooks/useUser";

export const Layout = () => {
  const user = useUser();
  const logout = useLogout();
  const home = useHome();
  const handleLogout = () => {
    logout();
  };
  const handleHome = () => {
    home();
  };
  return (
    <div>
      <AppShell
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
        padding="md"
        header={
          <Header
            height={50}
            p="xs"
            color="red"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Text weight={400} size="xl">
              <span>Olá, {user?.username}</span>
            </Text>
            <div style={{ marginLeft: "auto" }}>
              <Link to="/home">
                <Button variant="subtle" size="sm">
                  Home
                </Button>
              </Link>
              <Link to="/workout">
                <Button variant="subtle" size="sm">
                  Treinos
                </Button>
              </Link>
              <Link to="/diet">
                <Button variant="subtle" size="sm">
                  Dieta
                </Button>
              </Link>
            </div>
          </Header>
        }
      >
        <Outlet />
      </AppShell>
    </div>
  );
};

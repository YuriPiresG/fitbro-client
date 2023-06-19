import { Drawer, Text } from "@mantine/core";
import { useState } from "react";
import { CiEdit, CiSquareRemove } from "react-icons/ci";
import { Diet } from "../hooks/diet/useGetDiet";
import { Ingredient } from "../hooks/ingredients/useGetIngredients";
import { User } from "../hooks/useGetMe";
import CreateIngredient from "./buttons/CreateIngredient";
import DeleteIngredient from "./buttons/DeleteIngredient";
import UpdateIngredient from "./buttons/UpdateIngredient";

interface Props {
  user: User;
  diet: Diet;
  open: boolean;
  close: () => void;
}

function GetDiet(props: Props) {
  const [ingredientToUpdate, setIngredientToUpdate] =
    useState<Ingredient | null>(null);
  const [ingredientToDelete, setIngredientToDelete] =
    useState<Ingredient | null>(null);

  return (
    <>
      <Drawer
        opened={props.open}
        onClose={props.close}
        title={props.diet.name}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        transitionProps={{
          transition: "rotate-left",
          duration: 150,
          timingFunction: "linear",
        }}
      >
        <Drawer.Body>
          {props.diet.ingredients?.map((ingredient: Ingredient) => (
            <Text key={ingredient.id}>
              <h1>
                {ingredient.name}
                <CiEdit
                  className="shake-on-hover"
                  onClick={() => setIngredientToUpdate(ingredient)}
                />
                <CiSquareRemove
                  color="red"
                  className="shake-on-hover"
                  onClick={() => setIngredientToDelete(ingredient)}
                />
              </h1>
              <h3>Proteínas: {ingredient.protein}</h3>
              <h3>Calorias: {ingredient.calories}</h3>
              <h3>Carboidratos: {ingredient.carbs}</h3>
            </Text>
          ))}
          <CreateIngredient diet={props.diet} open />
        </Drawer.Body>
      </Drawer>
      {ingredientToUpdate && (
        <UpdateIngredient
          open={!!ingredientToUpdate}
          close={() => {
            setIngredientToUpdate(null);
          }}
          ingredient={ingredientToUpdate as Ingredient}
        />
      )}
      {ingredientToDelete && (
        <DeleteIngredient
          open={!!ingredientToDelete}
          close={() => {
            setIngredientToDelete(null);
          }}
          ingredient={ingredientToDelete as Ingredient}
        />
      )}
    </>
  );
}

export default GetDiet;

import { Center } from "@mantine/core";
import BodyImg from "../assets/body.png";
import Calves from "./body/Calves";
import Shoulders from "./body/Shoulders";
import Back from "./body/Back";
import Thighs from "./body/Thighs";
import Waist from "./body/Waist";
import Chest from "./body/Chest";
import Arms from "./body/Arms";
import Forearms from "./body/Forearms";
import Hips from "./body/Hips";

function Body() {
  return (
    <>
      <Center>
        <svg width="800" height="800" viewBox="0 0 800 800">
          <g id="Frame 1" clip-path="url(#clip0_9_22)">
            <rect id="Body 1" width="800" height="800" fill="url(#pattern0)" />
            <Calves />
            <Shoulders />
            <Back />
            <Thighs />
            <Waist />
            <Chest />
            <Arms />
            <Forearms />
            <Hips />
          </g>

          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_9_22" transform="scale(0.00125)" />
            </pattern>
            <clipPath id="clip0_9_22">
              <rect width="800" height="800" fill="white" />
            </clipPath>
            <image
              id="image0_9_22"
              data-name="Body.png"
              width="800"
              height="800"
              xlinkHref={BodyImg}
            />
          </defs>
        </svg>
      </Center>
    </>
  );
}

export default Body;

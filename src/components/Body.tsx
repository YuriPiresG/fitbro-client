import BodyImg from "../assets/body.png";
import "./body.css";

function BodyView() {
  return (
    <>
      <svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="Frame 1" clip-path="url(#clip0_9_22)">
          <rect id="Body 1" width="800" height="800" fill="url(#pattern0)" />
          <g id="Calves">
            <path d="M521 542V523.5L531 520L538.5 537L548 530L553.5 553L555.5 607L550.5 621L535 639.5L525.5 618.5L512.5 629.5L508.5 607V575.5L521 542Z" />
            <path d="M628 537L617.5 530L611 553V583.5V611L628 644L640 618.5L653.5 627.5L657.5 613V573.5L645 543.5V530L634.5 520L628 537Z" />
          </g>
          <g id="Shoulders">
            <path d="M134 213.5V244L155.5 227L161 215L165.5 206L175 199L176 189.5H161L150 192L137 203L134 213.5Z" />
            <path d="M285.5 190.5H266.5L264.5 199L279 211.5V223L307.5 245L306.5 209L300 199L285.5 190.5Z" />
          </g>
          <path
            id="Back"
            d="M519.5 211L540 191.5L523.5 180L552.5 175.5L574.5 183.5H591L602.5 175.5H628L641 180L628 191.5L647 211L641 243L631.5 282.5L628 309.5L602.5 335H566L540 306L536.5 286.5L528.5 261.5L523.5 243L519.5 211Z"
          />
          <g id="Thighs">
            <path d="M151 429L164 359H175L193.5 380.5L213 419L210 449.5L200.5 478L190 513L151 503.5V429Z" />
            <path d="M242 393.5L228 419V449.5L238.5 478L251 513L286 503.5V413.5L274.5 359L254 367.5L242 393.5Z" />
          </g>
          <path id="Waist" d="M268 312.5H172.5L169.5 357.5H272L268 312.5Z" />
          <path
            id="Chest"
            d="M171.5 200L159.5 213.5L171.5 249L197.5 254L212 246.5H226L245 254L272 249L275.5 239L280.5 213.5L272 200L254.5 195.5L228.5 205.5H212L184.5 195.5L171.5 200Z"
          />
          <g id="Biceps">
            <path d="M141 242L155 228H161V247L145 279L131 293H125.5V279L131 258L141 242Z" />
            <path d="M303.5 247L281 224.5V258L307.5 293H315.5V279L303.5 247Z" />
          </g>
          <g id="Triceps">
            <path d="M493 232.5L518 215.5V271L504.5 292L488.5 309.5L484 277.5L488.5 254.5L493 232.5Z" />
            <path d="M673.5 232.5L646 212V271L661 292L678.5 309.5L683 277.5L678.5 254.5L673.5 232.5Z" />
          </g>
          <g id="Forearms">
            <path d="M107 303.5L120.5 291.5L143 303.5L134 329.5L114 351.5L103.5 369.5L92.5 375.5L87 363.5L97 336.5L107 303.5Z" />
            <path d="M333.5 307L320 291.5L303 295.5L298.5 313.5L312.5 336.5L333.5 356L341.5 375.5L348.5 369.5L353 363.5L341.5 332.5L333.5 307Z" />
          </g>
          <path
            id="Hips"
            d="M567 351.5L524.5 381L530 430L582.5 408L637 430L640.5 378L602 351.5H567Z"
          />
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
    </>
  );
}

export default BodyView;

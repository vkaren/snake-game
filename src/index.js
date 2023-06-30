import Menu from "@pages/Menu";
import { app } from "@utils/globals";
import "./index.css";

const menuPage = new Menu();

app.append(menuPage.render());

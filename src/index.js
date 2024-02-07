import Menu from "@pages/Menu";
import { app } from "@app";
import "./index.css";

const menuPage = new Menu();

app.container.append(menuPage.render());

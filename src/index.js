import Menu from "@pages/Menu";
import { app } from "@utils/nodes";
import "./index.css";

const menuPage = new Menu();

app.append(menuPage.render());

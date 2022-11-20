import {Layout} from "./const";
import {setLayout} from "./utils";
import {initLoginPage} from "./login/login";

const root = document.getElementById("root");

setLayout(
    Layout.LOGIN,
    {
        root,
        cb: initLoginPage
    });

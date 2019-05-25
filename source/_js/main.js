import Form from "./component/Form";


document.addEventListener("DOMContentLoaded", () => {
    formInit();
});

const formInit = () => {
    const app = document.getElementById("app");
    new Form(app);
};
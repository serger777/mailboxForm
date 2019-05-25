class Form {
    constructor(el) {
        this.el = el;
        this.init();
    }
    init() {
        this.initForm();
        this.sendForm();
    }
    initForm() {
        const form =
            `<form class="form">
                <div class="form-wrap">
                <input class="form__input"  type="text">
                 <div class="result-block"></div> 
                </div>
                <button class="form__btn " type="submit">Send</button>
            </form>   
           `;
        this.el.innerHTML = form;
    }
    sendForm() {
        const formSubmit = this.el.querySelector("form");
        const input = formSubmit.querySelector(".form__input");
        formSubmit.addEventListener("submit", (e) => {
            e.preventDefault();
            this.requestForm(input.value);
        })
    }

    requestForm(value) {
        const url = `https://apilayer.net/api/check?access_key=9ddfff84cc198c09a839e9fb512609cb&email=${value}`;
        const resultBlock = document.querySelector(".result-block");
        const opt = {
            method: "GET",
        };
        fetch(url, opt)
            .then(response => response.json())
            .then(data => {

                let text, classText;
                if(data.format_valid){
                    text=`Valid Format`;
                    classText = `succes`;
                }else{
                    text='Not Valid format'
                    classText = `error`;
                }
                resultBlock.innerHTML = `<p class="${classText}">${text}</p>`
                })
            .catch((error) => {
                console.log(error);
                resultBlock.innerHTML = `<p class="error">Что то пошло не так ${error}</p>`
            })
    }
}
export default Form;
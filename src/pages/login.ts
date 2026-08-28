const form = document.querySelector('form') as HTMLFormElement;
const registerBtn = document.querySelector('#register-btn') as HTMLButtonElement;
const loginBtn = document.querySelector('#login-btn') as HTMLButtonElement;
let arrUser: User[] = JSON.parse(localStorage.getItem("Login") || "[]");
interface User{
    username: string,
    password: string
}


function registerF(e: Event): void{
    e.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if(username === "" || password === "") return;

    const userExist = arrUser.some(user => user.username === username);

    if(userExist){
        const userInput = document.querySelector('#username') as HTMLInputElement;

        userInput.placeholder = "This username already exists."
        form.reset();
        return;
    }

    const user: User = {
        username,
        password
    }
    

    arrUser.push(user);
    const userJson = JSON.stringify(arrUser);
    localStorage.setItem("Login", userJson);

    form.reset();
    
}

function loginF(e: Event){
    e.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if(username === "" || password === "") return;

    const userExist = arrUser.some(user => user.username === username);

    if(userExist){
        const loginUser = arrUser.filter(user => user.username === username);
        const passwordExist = loginUser.some(user => user.password === password);
        if(passwordExist){
            const storedLogs = JSON.stringify({loggedIn: true})
            localStorage.setItem("logged", storedLogs);
            window.location.href = "http://localhost:5173/"
        }else{
            console.log("Invalid Password")
        }
    }else{
        const userInput = document.querySelector('#username') as HTMLInputElement;

        userInput.placeholder = "User does not exist"
    }

    form.reset();
}

registerBtn.addEventListener("click", (e: Event) => registerF(e));
loginBtn.addEventListener('click', (e: Event) => loginF(e))
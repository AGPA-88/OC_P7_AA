
export default function initsignup () {
    let signUpButton = document.getElementById('signUp');
    let signInButton = document.getElementById('signIn');

    switchOnSignIn();

    signUpButton.addEventListener('click', () => {
        switchOnSignUp();
    });

    signInButton.addEventListener('click', () => {
        switchOnSignIn();
    });
}

function switchOnSignUp() {
    let container = document.getElementById('container');
    container.classList.add("right-panel-active");
}

function switchOnSignIn() {
    let container = document.getElementById('container');
    container.classList.remove("right-panel-active");
}
var optAutoRedirect;

function parseLocalStorage() {
    optAutoRedirect = JSON.parse(localStorage.autoRedirect || true);
}

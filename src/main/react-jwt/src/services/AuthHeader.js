export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.jwt) {
        console.log(user.jwt)
        return { Authorization: 'Bearer ' + user.jwt }; // for Spring Boot back-end
    } else {
        return {};
    }
}
const setCookies = (name: string, value: string, days:any) => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + days)
    const cookieValue = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieValue;
}   

const getCookie = (name: string) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}
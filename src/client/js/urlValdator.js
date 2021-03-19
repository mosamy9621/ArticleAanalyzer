export function validateURL(strURL) {
    // can be found here https://regexr.com/39nr7
    let strURLRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (strURL === '' || strURL.match(strURLRegex) === null) {
        return false;
    }
    return true;
}
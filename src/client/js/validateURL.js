export function ValidateURL(strURL) {
    // can be found here https://regexr.com/3um70
    let strURLRegex = /^(https?):\/\/[^\s$.?#].[^\s]*$/;

    if (strURL === '' || strURL.match(strURLRegex) === null) {
        return false;
    }
    return true;
}
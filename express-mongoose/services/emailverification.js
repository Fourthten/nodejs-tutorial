// Body email
module.exports = function bodyEmail(otpCode, verification) {
    let n = verification.indexOf("@");
    let strverify = verification.substring(0, n);
    let strmail = strverify.charAt(0).toUpperCase() + strverify.slice(1)
    let bodymail = "your body html";
    return {
        mailbody: bodymail
    }
}
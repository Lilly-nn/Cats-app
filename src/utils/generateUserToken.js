export function generateUserToken() {
    let token = 'id_';
    const length = 7;
    const options = "tyioemnahewlmnbca2345678990-=1THACHKIWPR";
    for(let i = 0; i<=length; i ++){
        let randomInd = Math.round(Math.random() * options.length);
        token += options[randomInd];
    }
    return token;
}
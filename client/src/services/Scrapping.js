import http from "../http-common";
import {
    authHeader
} from '../_helpers';


function startScrapping(nbp, idf, nidUser, skills, region) {
    var query2 = "site:linkedin.com/in/ AND" + "\"" + skills.join("\" \"") + "\"" + " AND \"" + region + "\""
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return fetch(`http://localhost:4000/scrape/?query=${query2}&nbp=${nbp}&idf=${idf}&nidUser=${nidUser}`, requestOptions).then(handleResponse);
}
/*
function startScrappingChangeAccount(nbp, idf, nidUser, skills, region,userNameAccount, passowrdAccount) {
    console.log(userNameAccount,passowrdAccount)
    var query2 = "site:linkedin.com/in/ AND" + "\"" + skills.join("\" \"") + "\"" + " AND \"" + region + "\""
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body:JSON.stringify({
            username: userNameAccount,
            passowrd: passowrdAccount
            })


    };

    return fetch(`http://localhost:4000/scrape/changeAccount?query=${query2}&nbp=${nbp}&idf=${idf}&nidUser=${nidUser}`, requestOptions).then(handleResponse);
}*/
const startScrappingChangeAccount =  (nbp, idf, nidUser, skills, region,userNameAccount, passowrdAccount)=> {
    console.log(userNameAccount,passowrdAccount)
    var query2 = "site:linkedin.com/in/ AND" + "\"" + skills.join("\" \"") + "\"" + " AND \"" + region + "\""
    return http.post(`http://localhost:4000/scrape/changeAccount?query=${query2}&nbp=${nbp}&idf=${idf}&nidUser=${nidUser}`, {
        'username': userNameAccount,
        'passowrd': passowrdAccount
        });
  };

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
export default {
    startScrapping,
    startScrappingChangeAccount

};
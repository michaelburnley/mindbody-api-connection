const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "ClassService";
const url = base_url + '/' + apiUrl + '.asmx';
const wsdl = '?wsdl';
const args = {
    "Request": {
        "Content-Type": "application/json",
        "API-key": process.env.MINDBODY_API_KEY,
        "SourceCredentials": {
            "SourceName": "OnePercentNutrition",
            "Password": "gj9RdLNeymPV7TK4kusMrzG7NYw=",
            "SiteIDs": {
                "int": -99
            }
        }
    },
    "UserCredentials": {
        "Username": "Siteowner",
        "Password": "apitest1234"
    }
};

const getClasses = () => {
    soap.createClient(url + wsdl, (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        client.GetClasses(args, (err, result) => {
            if(err) {
                console.log(err);
            }
            console.log(result.GetClassesResult.Classes);
        })
    });
}

const addClientToClass = () => {
    soap.createClient(url + wsdl, (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        client.AddClientsToClass(args, (err, result) => {
            if(err) {
                console.log(err);
            }
            console.log(result.AddClientsToClassResult);
        })
    });
}

module.exports.getClasses = getClasses;
module.exports.addClientToClass = addClientToClass;

    // postdata("", {}).then((data) =>
        const BASEURL = "http://localhost:4000/";
    export const apis = {
        post:async function (path, body) {
            return fetch(BASEURL + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }).then((response) => response.json());
        },
        get:async function(path){
            console.log("Inside get method");
            return fetch(BASEURL+path,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => response.json())
        },

        delete:async function(path){
            return fetch(BASEURL+path,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
           .then((response) => response.json())
        },
        update: async function (path, body) {
            return fetch(BASEURL + path, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error("Error updating data:", error);
                    throw error;
                });
        }
        

    };

  





    
import { setState } from "./helpers";
import { readUser } from "./user";
const log = console.log

export const updateProjectList = () => {
    const url = "/allProjects";
    log("updating all projects...")
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            log("ALL the projects")
            log(json.projects)
            setState("projectList", json.projects);
        })
        .catch(error => {
            console.log(error);
        });
};

export const addProject = (projectStruct) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/addProject", {
        method: "post",
        body: JSON.stringify(projectStruct),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    log("add project requesting")
    log(JSON.stringify(projectStruct))
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                log(res.json);
                updateProjectList()
            }
        })
        .catch(error => {
            log("error")
            log(error);
        });
};

export const deleteProject = (projectID) => {
    // Create our request constructor with all the parameters we need
    console.log("sending delete request via action")
    const request = new Request(`/deleteProject/${projectID}`, {
        method: "delete"
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // this is saved in local storage for now, need to use session and cookie
                updateProjectList()
                readUser()
                log(res.json);
            }
        })
        .catch(error => {
            log("error")
            log(error);
        });
};
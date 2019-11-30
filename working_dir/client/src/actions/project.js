import { setState, setEmptyState } from "./helpers";
// getState is used to get the value of a state path
import { getState } from "statezero";
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
    });
    log("add project requesting")
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // this is saved in local storage for now, need to use session and cookie
                updateProjectList()
                log(res.json);
            }
        })
        .catch(error => {
            log("error")
            log(error);
        });
};
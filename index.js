//imports
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const readline = require("readline-sync");


//variables for data usage
var repoNames = [];
var username = readline.question("Enter username: ");
var URL = `https://api.github.com/users/${username}`;
// var URL2 = `https://api.github.com/users/${username}/repos`
var userName = '';
var thumbNail = '';
var userEmail = '';
inquirer.prompt([
    {
        type: "input",
        message: "Project Title: ",
        name: "projectTitle"
    },
    {
        type: "input",
        message: "Description: ",
        name: "projectDescription"
    },
    {
        type: "input",
        message: "Installation Instructions: ",
        name: "projectInstal"
    },
    {
        type: "input",
        message: "Project Usage:",
        name: "projectUsage"
    },
    {
        type: "input",
        message: "Lisences: ",
        name: "projectLisence"
    },
    {
        type: "input",
        message: "Contributors: ",
        name: "projectContributors"
    },
    {
        type: "input",
        message: "Tests: ",
        name: "projectTests"
    },
    {
        type: "input",
        message: "Enter your email: ",
        name: "projectEmail"
    }
// ]).then(function(projectTitle, projectDescription, projectInstal, projectUsage, projectLisence, projectContributors, projectTests, projectEmail){
]).then(function(response){

    axios
    //get user's info
    .get(URL)
    .then(function (res) {
        // console.log("Project Title: " + response.projectTitle);
        console.log(URL);
        userName = res.data.name;
        thumbNail = '![Profile pic]' + `(${res.data.avatar_url})`;
        console.log("Profile pic: " + thumbNail);
        


        //select repos
        // axios
        //     .get(URL2)
        //     .then(function (res2) {
        //         res2.data.forEach(element => {
        //             repoNames.push(element.full_name)
        //         });
        //         console.log(repoNames);
        //         var repoSelect = readline.question("Enter a repo name: "); 
        //         console.log(`${repoSelect} selected.`)
                
        //     })
        //save to README file
        const badge = '[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)'
        const toc = "##Table of contents: \n *Project Tile \n *Description \n *Installation \n *Project Usage \n *Lisences \n *Contributors \n *Tests \n *User \n";
        let inputData = [toc, "\n ##Project Title: \n", response.projectTitle, "\n ##Description: \n", response.projectDescription, "\n ##Installation: \n", response.projectInstal, "\n ##Usage: \n", response.projectUsage, "\n ##DLisence: \n", response.projectLisence, "\n ##Contributors: \n", response.projectContributors, "\n ##Tests: \n", response.projectTests, "\n ##Email: \n",response.projectEmail]

        // let inputData = [toc, projectTitle, projectDescription, projectInstal, projectUsage, projectLisence, projectContributors, projectTests, projectEmail]
        fs.writeFile("newREADME.md", inputData.join("") + "\n" + userName + "\n" + thumbNail + "\n" + badge + "\n", function (err) {
            if (err) throw err
            // console.log("Project Title: " + projectTitle)
            console.log("File Saved");
            console.log(inputData);
        })
    });
});






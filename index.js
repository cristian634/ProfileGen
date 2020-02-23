const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer"); 
const readline = require("readline-sync");
var repoNames = [];
var username = readline.question("Enter username: ");
var URL = `https://api.github.com/users/${username}`
var thumbNail = '';
var userEmail = '';


axios
    .get(URL)
    .then(function(res){
        console.log(URL);
        
        thumbNail = '[Profile pic]'+`(${res.data.avatar_url})` ;
        console.log("Profile pic: "+ thumbNail);
        userEmail = res.data.email;
        console.log("User email: "+userEmail);
        // res.data.forEach(element =>{
        //     repoNames.push(element.full_name)});
        // console.log(repoNames);

        fs.writeFile("README.md", thumbNail + "\n", function(err){
            if (err) throw err
        
            console.log("File Saved");
        })
    });




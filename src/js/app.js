"use strict";

window.onload = async () => {
    const url = "https://dahlgren.miun.se/ramschema_ht23.php";
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();

        const inputElement = document.getElementById("search-input");
        inputElement.addEventListener("keyup", () => {
            searchCourses(inputElement.value.toLowerCase(), data);
        });

        Array.from(document.getElementsByTagName("th")).forEach((e) => {
            e.addEventListener("click", () => sortCourses(e.id, data));
        });

        createTable(data);
    } else {
        console.log("ERROR: " + response.statusText);
    }
}

function searchCourses(input, courses) {
    const searchResult = courses.filter(course => {
        const coursenameLower = course.coursename.toLowerCase();

        if (course.code.includes(input)) {
            return true;
        } else if (coursenameLower.includes(input)) {
            return true;
        } else {
            return false;
        }
    });

    createTable(searchResult);
}

function sortCourses(choice, courses) {
    switch (choice) {
        case "table-code":
            courses.sort((a, b) => (a.code > b.code) ? 1 : -1);
            break;
        case "table-name":
            courses.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);
            break;
        case "table-prog":
            courses.sort((a, b) => (a.progression > b.progression) ? 1 : -1);
            break;
        default:
            console.log("INVALID CHOICE-ID");
    }

    createTable(courses);
}

function createTable(courses) {
    const tableElement = document.getElementsByTagName("tbody")[0];
    tableElement.innerHTML = "";

    courses.forEach((course) => {
        tableElement.appendChild(createTableRow(course));
    });
}

function createTableRow(course) {
    const trElement = document.createElement("tr");

    const codeElement = document.createElement("td");
    const codeText = document.createTextNode(course.code);
    codeElement.appendChild(codeText);

    const nameElement = document.createElement("td");
    const nameText = document.createTextNode(course.coursename);
    nameElement.appendChild(nameText);

    const progElement = document.createElement("td");
    const progText = document.createTextNode(course.progression);
    progElement.appendChild(progText);

    trElement.appendChild(codeElement);
    trElement.appendChild(nameElement);
    trElement.appendChild(progElement);

    trElement.addEventListener("click", () => window.open(course.syllabus, '_blank'));

    return trElement;
}
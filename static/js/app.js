// Level 1: -----------------------------------------------------------------
// target the place "table" where data will be appended into
var tbody = d3.select("#target-table-display");
// select the "submit button" & "input field"
var submitButton = d3.select("#filter-btn-date");
var inputField = d3.select("#datetime");
// select city buttons
var citysubmitButton = d3.select("#filter-btn-city");
var cityinputField = d3.select("#cityname");
// select state buttons
var statesubmitButton = d3.select("#filter-btn-state");
var stateinputField = d3.select("#statename");
// select country buttons
var countrysubmitButton = d3.select("#filter-btn-country");
var countryinputField = d3.select("#countryname");
// select shape buttons
var shapesubmitButton = d3.select("#filter-btn-shape");
var shapeinputField = d3.select("#shapename");


// Create table structure in the html file and insert each "data" object
data.forEach(obj => {
    // for each "element" in the object create a row
    var tRow = tbody.append("tr");
    //below "object" becomes the targetet array (element)
    Object.entries(obj).forEach(([key,value]) => {
        // console.log(`The key is: ${key} and the value is: ${value}`);
        var tData = tRow.append("td");
        // adds the "value" to each row in the table
        tData.text(value);
    });
});

// implementing fuction to "submit button"
submitButton.on("click", function() {
    // clears the data of the current table        
    tbody.html("");
    // stop the page from refresh
    d3.event.preventDefault();
    // print "You have just clicked the 'Filter Table' on console, for testing
    console.log("You have just clicked the ' Date Time Filter Button'.");
    // select the "input element" and get the raw html node
    var inputField = d3.select("#datetime");
    // get the value property of the "input" element 
    var inputElement = inputField.property("value");
    // print value in console
    console.log(inputElement);
    // use the "field input" to filter the data by "date" only
    var inputTypeArray = data.filter(one => one.datetime === inputElement);   // var inputTypeArray = data.filter(one => one[chosen] === inputElement);
    console.log(inputTypeArray)

    
    // display in the html file (appends it at the end, after displaying all original data)
    inputTypeArray.forEach((selection) => {
        // for each "element" create a row
        var row = tbody.append("tr");
        //below "object" becomes the targetet array (element)
        Object.entries(selection).forEach(([key,value]) => {
            var cell = row.append("td");
            // adds the "value" to each row in the table
            cell.text(value);
        });
    });      
});

// Level 2: ----------------------------------------------------
// adjust for queries to understand other filter searches
citysubmitButton.on("click", function() {
    // clears the data of the current table        
    tbody.html("");
    // stop the page from refresh
    d3.event.preventDefault();
    // print "You have just clicked the 'Filter Table' on console, for testing
    console.log("You have just clicked the 'City Filter Button'.");
    // select the "input element" and get the raw html node
    // var cityinputField = d3.select("#cityname");
    // get the value property of the "input" element 
    var cityinputElement = cityinputField.property("value");
    // print value in console
    console.log(cityinputElement);
    // use the "field input" to filter the data by "date" only
    var cityinputTypeArray = data.filter(two => two.city === cityinputElement);   // var inputTypeArray = data.filter(one => one[chosen] === inputElement);
    console.log(cityinputTypeArray)

    
    // display in the html file (appends it at the end, after displaying all original data)
    cityinputTypeArray.forEach((selects) => {
        // for each "element" create a row
        var Crow = tbody.append("tr");
        //below "object" becomes the targetet array (element)
        Object.entries(selects).forEach(([key,value]) => {
            var Ccell = Crow.append("td");
            // adds the "value" to each row in the table
            Ccell.text(value);
        });
    });      
});


statesubmitButton.on("click", function() {
    // clears the data of the current table        
    tbody.html("");
    // stop the page from refresh
    d3.event.preventDefault();
    // print "You have just clicked the 'Filter Table' on console, for testing
    console.log("You have just clicked the 'State Filter Button'.");
    // select the "input element" and get the raw html node
    
    // get the value property of the "input" element 
    var stateinputElement = stateinputField.property("value");
    // print value in console
    console.log(stateinputElement);
    // use the "field input" to filter the data by "state" only
    var stateinputTypeArray = data.filter(three => three.state === stateinputElement);   // var inputTypeArray = data.filter(one => one[chosen] === inputElement);
    console.log(stateinputTypeArray)

    
    // display in the html file (appends it at the end, after displaying all original data)
    stateinputTypeArray.forEach((selectss) => {
        // for each "element" create a row
        var Srow = tbody.append("tr");
        //below "object" becomes the targetet array (element)
        Object.entries(selectss).forEach(([key,value]) => {
            var Scell = Srow.append("td");
            // adds the "value" to each row in the table
            Scell.text(value);
        });
    });      
});


countrysubmitButton.on("click", function() {
    // clears the data of the current table        
    tbody.html("");
    // stop the page from refresh
    d3.event.preventDefault();
    // print "You have just clicked the 'Filter Table' on console, for testing
    console.log("You have just clicked the 'Country Filter Button'.");
    // select the "input element" and get the raw html node
    
    // get the value property of the "input" element 
    var countryinputElement = countryinputField.property("value");
    // print value in console
    console.log(countryinputElement);
    // use the "field input" to filter the data by "country" only
    var countryinputTypeArray = data.filter(four => four.country === countryinputElement);   // var inputTypeArray = data.filter(one => one[chosen] === inputElement);
    console.log(countryinputTypeArray)

    
    // display in the html file (appends it at the end, after displaying all original data)
    countryinputTypeArray.forEach((selectsc) => {
        // for each "element" create a row
        var Corow = tbody.append("tr");
        //below "object" becomes the targetet array (element)
        Object.entries(selectsc).forEach(([key,value]) => {
            var Cocell = Corow.append("td");
            // adds the "value" to each row in the table
            Cocell.text(value);
        });
    });      
});



shapesubmitButton.on("click", function() {
    // clears the data of the current table        
    tbody.html("");
    // stop the page from refresh
    d3.event.preventDefault();
    // print "You have just clicked the 'Filter Table' on console, for testing
    console.log("You have just clicked the 'Shape Filter Button'.");
    // select the "input element" and get the raw html node
    
    // get the value property of the "input" element 
    var shapeinputElement = shapeinputField.property("value");
    // print value in console
    console.log(shapeinputElement);
    // use the "field input" to filter the data by "shape" only
    var shapeinputTypeArray = data.filter(five => five.shape === shapeinputElement);   // var inputTypeArray = data.filter(one => one[chosen] === inputElement);
    console.log(shapeinputTypeArray)

    
    // display in the html file (appends it at the end, after displaying all original data)
    shapeinputTypeArray.forEach((selectsh) => {
        // for each "element" create a row
        var Shrow = tbody.append("tr");
        //below "object" becomes the targetet array (element)
        Object.entries(selectsh).forEach(([key,value]) => {
            var Shcell = Shrow.append("td");
            // adds the "value" to each row in the table
            Shcell.text(value);
        });
    });      
});

 
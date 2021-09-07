var key = document.getElementById("key");
var fullform = document.getElementById("fullform");
var table = document.querySelector("table");
var db = openDatabase("shortHandsDB", "1.0", "This is the database for personal shorthands diary", 2*1024*1024);
db.transaction((transaction) => {
    var query = "CREATE TABLE IF NOT EXISTS Shorthands(key VARCHAR(20) PRIMARY KEY NOT NULL, fullform VARCHAR(40) NOT NULL);";
    transaction.executeSql(query);
});
db.transaction((transaction) => {
    var query = "SELECT * FROM Shorthands;";
    transaction.executeSql(query, undefined, (transaction, results) => {
        if(results.rows.length > 0) {
            for(var i=0; i<results.rows.length; i++) {
                var row = document.createElement("tr");
                var col1 = document.createElement("td");
                col1.innerText = results.rows.item(i).key;
                var col2 = document.createElement("td");
                col2.innerText =results.rows.item(i).fullform;
                var col3 = document.createElement("td");
                var span = document.createElement("span");
                span.innerText = "❌";
                span.style.cursor = "pointer";
                span.addEventListener("click", deleteRow);
                col3.appendChild(span);
                row.append(col1, col2, col3);
                table.appendChild(row);
            }
        }
    });
});
document.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();
    if(key.value && fullform.value) {
        db.transaction((transaction) => {
            var query = "INSERT INTO Shorthands (key,fullform) VALUES ('"+key.value+"', '"+fullform.value+"');";
            transaction.executeSql(query);
        });
        db.transaction((transaction) => {
            var query = "SELECT * FROM Shorthands WHERE key='"+key.value+"';";
            transaction.executeSql(query, undefined, (transaction, results) => {
                var row = document.createElement("tr");
                var col1 = document.createElement("td");
                col1.innerText = results.rows.item(0).key;
                var col2 = document.createElement("td");
                col2.innerText =results.rows.item(0).fullform;
                var col3 = document.createElement("td");
                var span = document.createElement("span");
                span.innerText = "❌";
                span.style.cursor = "pointer";
                span.addEventListener("click", deleteRow);
                col3.appendChild(span);
                row.append(col1, col2, col3);
                table.appendChild(row);
            });
            key.value = "";
            fullform.value = "";
        });
    } else {
        alert("The inputs can't be empty!");
    }    
});
function deleteRow(event) {
    var nodeToBeDeleted = event.target.parentElement.parentElement;
    var keyToBeDeleted = nodeToBeDeleted.childNodes[0].innerText;
    db.transaction((transaction) => {
        var query = "DELETE FROM Shorthands WHERE key='"+keyToBeDeleted+"';";
        transaction.executeSql(query);
        table.removeChild(nodeToBeDeleted);
    });
}
var controls = controls || {};
(function (c) {
    var TableView = Class.create({
        init: function (itemSource) {
            if (!(itemSource instanceof Array)) {
                throw "The itemSource of a TreeView must be an array!";
            }
            this.itemSource = itemSource;           
        },
        render: function (template, rows) {
            var table = document.createElement("table");
            var maxTdsOnSingleRow = this.itemSource.length /rows;

            for (var j = 0; j < rows; j++) {
                var tr = document.createElement("tr");
                for (var i = 0; i < maxTdsOnSingleRow; i++) {                  
                    var item = this.itemSource[i];
                    tr.innerHTML += template(item);                   
                }
                table.appendChild(tr);
            }
            return table.outerHTML;
        }
    });

    c.getTableView = function (itemSource) {
        return new TableView(itemSource);
    }
}(controls || {}));
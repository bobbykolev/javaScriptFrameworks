/// <reference path="jquery-2.0.3.js" />
/// <reference path="class.js" />
var controls = controls || {};
(function (c) {
    var ListView = Class.create({
        init: function (itemsSource) {
            if (!(itemsSource instanceof Array)) {
                throw "The itemsSource of a ListView must be an array!";
            }
            this.itemsSource = itemsSource;
        },
        render: function (template, rows) {
            var table = document.createElement("table");

            var maxTdsOnSingleRow = this.itemsSource.length / rows;

            for (var j = 0; j < rows; j++) {
                var tr = document.createElement("tr");
                for (var i = 0; i < maxTdsOnSingleRow; i++) {                  
                    var item = this.itemsSource[i];
                    tr.innerHTML += template(item);                   
                }
                table.appendChild(tr);
            }
            return table.outerHTML;
        }
    });

    c.getListView = function (itemsSource) {
        return new ListView(itemsSource);
    }
}(controls || {}));
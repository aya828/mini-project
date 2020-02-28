$(document).ready(function(){

  const getWidgets = function(){
    // Api call to get the list of widgets
    $.ajax({
      type: "GET",
      url: "/api/widgets"
    }).then(function(resp){

      const wipeDb = indexedDB.deleteDatabase("mongoprods");
      const request = window.indexedDB.open("mongoprods", 1);

      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        const widgetStore = db.createObjectStore('widgets', {keyPath: '_id'});        widgetStore.createIndex("priceIdx", "price");
      };

      // All operations on our object store happen here
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(["widgets"], "readwrite");
        const widgetStore = transaction.objectStore("widgets");
        
        // Loop through Mongo data
        for( let i = 0; i < resp.length; i++ ){
          const widget = resp[i];
          widgetStore.add(widget);
        }

        const getCursorRequest = widgetStore.openCursor();
        getCursorRequest.onsuccess = e => {
          const cursor = e.target.result;
          if (cursor) {
            if (cursor.value.price < 10) {
              const widget = cursor.value;
              console.log( widget.name + " is priced below $10.")
            }

            if (cursor.value.quantity > 100) {
              const widget = cursor.value;
              console.log( widget.name + " has qty greater than 100.")
            }

            cursor.continue();
          }
        };
      };
    })
  }

  getWidgets();
});



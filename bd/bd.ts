let openRequest = indexedDB.open("store", 1);

openRequest.onupgradeneeded = function() {
    // se dispara si el cliente no tiene la base de datos
    // ...ejecuta la inicialización...
  };

  openRequest.onerror = function() {
    console.error("Error", openRequest.error);
  };
  
  openRequest.onsuccess = function() {
    let db = openRequest.result;
    // continúa trabajando con la base de datos usando el objeto db
  };
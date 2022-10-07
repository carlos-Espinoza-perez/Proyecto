const uploadModels = async (file: File, bucketKey: string, callback: Function) => {
    let data = new FormData();
    data.append('model-file', file);
    data.append('bucket-key', bucketKey)


    if (file.name.endsWith('.zip')) { // Cuando el archivo es un ZIP entonces se pide el nombre principal del archivo.
        const entrypoint = window.prompt('Ingrese el nombre de archivo del diseño principal dentro del ZIP.');
        data.append('model-zip-entrypoint', entrypoint);
    }

    
    await fetch('/Models', { method: 'POST', body: data })
        .then(a => a.json())
        .then(a => callback(a))
        .catch(a => {
            alert(`${file.name} no puede ser subido al servidor`);
        });
}

export {
    uploadModels
}
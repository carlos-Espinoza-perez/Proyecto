import './extensions/customColor';

async function getAccessToken(callback) {
    try {
        const resp = await fetch('/auth/token');
        if (!resp.ok) {
            throw new Error(await resp.text());
        }
        const { access_token, expires_in } = await resp.json();
        callback(access_token, expires_in);
    } catch (err) {
        alert('Could not obtain access token. See the console for more details.');
        console.error(err);
    }
}

export function initViewer(container) {
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer({ getAccessToken }, function () {
            const config = {
                extensions: ['Autodesk.DocumentBrowser', 'GoogleMapsLocator', 'CustomColor'],
            };

            
            
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            viewer.start();
            
            viewer.setBackgroundColor(255, 255, 255, 255, 255, 255);
            viewer.setTheme('light-theme');
            
            resolve(viewer);
        });
    });
}

export function loadModel(viewer, urn) {
    return new Promise(function (resolve, reject) {
        
        function onDocumentLoadSuccess(doc) {
            resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));

            viewer.setBackgroundColor(255, 255, 255, 255, 255, 255);
            viewer.setTheme('light-theme');
            viewer.loadExtension("TransformationExtension")
        }

        function onDocumentLoadFailure(code, message, errors) {
            alert(`Código de error: ${code}, mensaje: ${message}`);
            reject({ code, message, errors });
        }
        
        // viewer.setLightPreset(0);
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}
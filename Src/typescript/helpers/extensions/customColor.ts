class CustomColor extends Autodesk.Viewing.Extension {

    constructor(viewer, options) {
        super(viewer, options);
        this.onCreacionContextualMenuItem = this.onCreacionContextualMenuItem.bind(this);

        Autodesk.Viewing.Extension.call(this, viewer, options);    
    }

    load(): boolean {
        this.viewer.registerContextMenuCallback(
            this.menuId,
            this.onCreacionContextualMenuItem
        );

        const ctrlGroup = new Autodesk.Viewing.UI.ControlGroup('LateralToolbar.ControlGroup');
        this.createPanelButton(ctrlGroup);
        
        const toolbar = new Autodesk.Viewing.UI.ToolBar('toolbar-extension');
        toolbar.addControl(ctrlGroup);
        
        const element = document.createElement('div');

        element.setAttribute("style", "top: calc(50% + 25px); left: 0%; z-index: 100; position: absolute;")
        element.id = "divToolbar";

        //Añado el contenedor al viewer
        this.viewer.container.appendChild(element);

        
        document.querySelector('#divToolbar').appendChild(toolbar.container);
        return true; 
    }

    unload(): boolean {
        document.querySelector('#LateralToolbar.ControlGroup')?.remove();
        return true;
    }

    get menuId() {
        return 'ItemMenuContextual';
    }

    onCreacionContextualMenuItem(menu, status): void {
        menu.push({
            title: "Borrar selección de color",
            target: () => this.viewer.clearThemingColors(this.viewer.model)
        });
    }







    createPanelButton(ctrl) {
        const buttonInspecion = new Autodesk.Viewing.UI.Button('showInformacion');
        buttonInspecion.onClick = () => this.customizeColor(buttonInspecion);


        ctrl.addControl(buttonInspecion);
        buttonInspecion.setToolTip('Elejir un color para esta opción');
        buttonInspecion.setIcon('adsk-icon-box');
    }

    customizeColor(element) {
        const listElementSelect = this.viewer.getSelection(); 
        if (listElementSelect.length == 0) return;


        this.viewer.clearSelection();

        
        const newContent = document.createElement('input');
        newContent.type = 'color';

        const container = element.container;
        
        container.parentElement.appendChild(newContent);
        container.parentElement.classList.add("select")

        newContent.onblur = () => {
            newContent.remove();
            container.parentElement.classList.remove('select');
        }

        newContent.oninput = (e) => {
            let color = new THREE.Color( newContent.value );
            let outputColor = new THREE.Vector4(color.r , color.g, color.b, 1);
            
            for (const item of listElementSelect) {
                this.viewer.setThemingColor(item, outputColor);
            }
        };
    }
}


Autodesk.Viewing.theExtensionManager.registerExtension('CustomColor', CustomColor);




function BuscarNombreImagen(callback) {
    console.log(callback);
}

function CrearPanel(imageName) {
    console.log(imageName);
}



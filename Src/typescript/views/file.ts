import { initViewer, loadModel } from "../helpers/viewer";

import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import {MDCMenu} from '@material/menu';


import axios from "axios";
import { uploadModels } from "../helpers/models";



const list = new MDCList(document.querySelector('.mdc-list'));
const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));

const menu = new MDCMenu(document.querySelector('.mdc-menu'), );




// @ts-ignore
window.menu = menu;


let __viewer__;
let __urn__ = location.href.split('/')[location.href.split('/').length - 1];


initViewer(document.querySelector('.viewer'))
    .then(a => {
        __viewer__ = a;
        
        getListBucketByModel();
        loadModel(__viewer__, __urn__);
    });



const addOptionToList = (item, className) => {
    let name = item.objectKey;

    if (className.includes("bucket "))
        name = item.name.split("__")[1]?.split("-").join(" ");

    return `
        <li class="mdc-list-item ${className}" bucket-key="${item.bucketKey}"  ${ item.urn ? `obj-urn="${item.urn}"` : '' }  ${item.objectKey ? `obj-key="${item.objectKey}"` : ''}>
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">${name}</span>

            <span aria-hidden="true" class="mdc-list-item__meta">
                <button class="mdc-icon-button material-icons" onclick="openSubMenu(this)" data-bucket-key="${item.bucketKey}">
                    more_vert
                </button>
            </span>
        </li>
        
        <li role="separator" class="mdc-list-divider"></li>
    `
};

// Cargar bucket 
const getListBucketByModel = async () => {
    (document.querySelector(".mdc-fab") as HTMLInputElement).onclick = () => createBucketByModel();
    // @ts-ignore
    const response = await axios.get(`/Models/GetLisBucketByModel?objectId=${__objectId__}`);

    let html = "";
    for (const item of response.data) {
        const name = item.name.split("__")[1]?.split("-").join(" ");
        if (!name) continue;

        const responseFiles = await axios.get(`/Models?bucketKey=${item.bucketKey}`);

        html += addOptionToList(item, `bucket bucket-key-${item.bucketKey}`);

        for (const file of responseFiles.data) {
            file.bucketKey = item.bucketKey;
            html += addOptionToList(file, `object bucket-key-${item.bucketKey}`)
        }
    }

    

    document.querySelector('.list-object .mdc-list').innerHTML = html;
};


// Create bucket
const createBucketByModel = async () => {
    const nameBucket = prompt("Escribe el nombre del folder");
    if (!nameBucket) return;

    try
    {
        // @ts-ignore
        await axios.post(`/Models/CreateBucket?objectId=${__objectId__}&bucketKey=${nameBucket}`)

        getListBucketByModel();
    }

    catch(ex)
    {
        alert(ex);
    }
};



// Sub menu 
let __bucketKeySelect__;
let __objectIdSelect__
const openSubMenu = (element: HTMLButtonElement) => {
    const position = element.getBoundingClientRect();

    menu.setAbsolutePosition(position.x, position.y + 48)
    menu.open = true;

    const isFile = element.parentElement.parentElement.getAttribute('obj-urn');
    const bucket = document.querySelector(".mdc-list.bucket") as HTMLElement;
    const file = document.querySelector(".mdc-list.file") as HTMLElement;

    __bucketKeySelect__ = element.dataset.bucketKey;


    if (isFile) {
        bucket.classList.remove("show");
        file.classList.add("show");

        __objectIdSelect__ = element.parentElement.parentElement.getAttribute('obj-key');
    }    
    
    else {
        bucket.classList.add("show");
        file.classList.remove("show");
    }

};

// @ts-ignore
window.openSubMenu = openSubMenu;







const addObjectByBucket = async () => {
    const inputFile = document.querySelector("#file-obj") as HTMLInputElement;

    inputFile.click();

    inputFile.onchange = () => {
        const file = inputFile.files[0];
        if (!file) return;

        uploadModels(file, __bucketKeySelect__, (e) => {

            e.objectKey = e.name;
            e.bucketKey = __bucketKeySelect__;
            let newElement = addOptionToList(e, `object bucket-key-${__bucketKeySelect__}`);

            const bucket = document.querySelector(`.bucket.bucket-key-${__bucketKeySelect__}`);
            bucket.nextElementSibling.insertAdjacentHTML('afterend', newElement);
        });
    };
};

// @ts-ignore
window.addObjectByBucket = addObjectByBucket;


const deleteBucket = async () => {
    const confirmacion = confirm("¿Estás seguro de que deseas borrar este folder y todos los archivos que pertenecen?");
    if (!confirmacion) return;

    try {
        axios.post(`/Models/DeleteBucket?bucketKey=${__bucketKeySelect__}`);

        const listFolderAndFiles = document.querySelectorAll(`.bucket-key-${__bucketKeySelect__}`) as any as Array<HTMLElement>;
        for (const item of listFolderAndFiles) {
            item.nextElementSibling.remove();
            item.remove();
        }
    } 
    
    catch (error) {
        alert("Algo fallo al momento de borrarlo");
    }
};

// @ts-ignore
window.deleteBucket = deleteBucket;




const deleteArchivo = async () => {
    await axios.post(`/Models/DeleteModel?bucketKey=${__bucketKeySelect__}&objectId=${__objectIdSelect__}`);

    document.querySelector(`*[obj-key="${__objectIdSelect__}"]`)?.remove();
    document.body.click();
};


// @ts-ignore
window.deleteArchivo = deleteArchivo;


// Eventos para mostrar un archivo
document.addEventListener("click", (e) => {
    // @ts-ignore
    const target = e.target.closest(".object");
    // @ts-ignore
    if ((target && e.target.tagName == "BUTTON") || !target) return;

    let urn = target.getAttribute("obj-urn");
    loadModel(__viewer__, urn);


    const btnUndo = document.querySelector(".undo") as HTMLButtonElement;
    btnUndo.classList.add("show");
    
    btnUndo.onclick = () => {
        btnUndo.classList.remove("show");
        loadModel(__viewer__, __urn__);
    }
});
import { initViewer, loadModel } from "../helpers/viewer";

import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import {MDCMenu} from '@material/menu';


import axios from "axios";



const list = new MDCList(document.querySelector('.mdc-list'));
const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));

const menu = new MDCMenu(document.querySelector('.mdc-menu'));
menu.open = true;

// @ts-ignore
window.list = list;


let __viewer__;
let __urn__ = location.href.split('/')[location.href.split('/').length - 1];


initViewer(document.querySelector('.viewer'))
    .then(a => {
        __viewer__ = a;
        
        getListBucketByModel();
        loadModel(__viewer__, __urn__);
    });



// Cargar bucket 
const getListBucketByModel = async () => {
    (document.querySelector(".mdc-fab") as HTMLInputElement).onclick = () => createBucketByModel();
    // @ts-ignore
    const response = await axios.get(`/Models/GetLisBucketByModel?objectId=${__objectId__}`);

    let html = "";
    for (const item of response.data) {
        const name = item.name.split("__")[1]?.split("-").join(" ");
        if (!name) continue;

        html += 
            `
                <li class="mdc-list-item">
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">${name}</span>

                    <span aria-hidden="true" class="mdc-list-item__meta ${item.bucketKey}">
                        <button class="mdc-icon-button material-icons">
                            more_vert
                        </button>
                    </span>
                </li>
                
                <li role="separator" class="mdc-list-divider"></li>
            `
    }

    document.querySelector('.list-object .mdc-list').innerHTML = html;
};


// Create bucket
const createBucketByModel = async () => {
    const nameBucket = prompt("Escribe el nombre del folder");
    if (nameBucket == "") return;

    try
    {
        // @ts-ignore
        const response = await axios.post(`/Models/CreateBucket?objectId=${__objectId__}&bucketKey=${nameBucket}`)

        getListBucketByModel();
    }

    catch(ex)
    {
        alert(ex);
    }
};
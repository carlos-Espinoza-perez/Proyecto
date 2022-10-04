//Listar archivos.
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const CopyPlugin = require("copy-webpack-plugin");

var __files__ = {};

const getNameForJs = (pathFile) => {
    let name = pathFile.replaceAll('\\', '/');
    console.log(name);
    name = name.replaceAll('Src/typescript', 'js');

    if (name.includes('.module')) return { invalid: true };

    name = name.replaceAll(".ts", ".js");
    return {
        name: name,
        ext: pathFile.split(".")[1]
    };
};

const scanFolder = (pathFolder, ext) => {
    try {
        const ls = fs.readdirSync(pathFolder);

        for (let index = 0; index < ls.length; index++) {

            const file = path.join(pathFolder, ls[index]);

            let dataFile = null;
            try { dataFile = fs.lstatSync(file); } catch (e) { }

            if (dataFile && dataFile.isDirectory()) {
                scanFolder(file, ext);
                continue;
            }

            else if (dataFile) {
                let fileName = "";
                if (ext == "js") fileName = getNameForJs(file);
                
                if (fileName.invalid) continue;

                __files__[fileName.name] = './' + file;
            }
        }
    }

    catch (e) { console.log(e); }
};


scanFolder("./Src/typescript", "js");

module.exports = {
    stats: 'minimal',

    entry: __files__,

    output: {
        path: path.resolve(__dirname, '../wwwroot'),
        filename: "[name]",
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/images", to: path.resolve(__dirname, '../wwwroot/images') },
            ],
        }),
    ],
};
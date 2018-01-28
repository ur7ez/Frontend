angular.module('myApp', []);
let myMenu = angular.module('myMenu', []);

let menu = function () {
    this.menuItems = [
        {
            menu: 'File', submenu: [
                {name: 'New document', imgClass: 'fa-file-o'},
                {name: 'Save as...', imgClass: 'fa-floppy-o'},
                {name: 'Open recent', imgClass: 'fa-folder-open-o'},
                {name: 'Exit'},
            ]
        },
        {
            menu: 'Edit', submenu: [
                {name: 'Cut', imgClass: 'fa-scissors'},
                {name: 'Copy', imgClass: 'fa-clipboard'},
                {name: 'Paste'},
                {name: 'Delete', imgClass: 'fa-trash'},
                {name: 'Select all'},
            ]
        },
        {
            menu: 'View', submenu: [
                {name: 'Contaxt info'},
                {name: 'Toolbar'},
                {name: 'Enter presentation mode'},
            ]
        },
        {
            menu: 'Insert', submenu: [
                {name: 'Object from ...'},
                {name: 'Image ...', imgClass: 'fa-picture-o'},
                {name: 'Text File ...', imgClass: 'fa-file-text-o'},
            ]
        },
        {
            menu: 'Format', submenu: [
                {name: 'sort', imgClass: 'fa-sort'},
                {name: 'prettify'},
                {name: 'refactor'},
            ]
        },
        {
            menu: 'Table', submenu: [
                {name: 'insert columns ...'},
                {name: 'insert rows ...'},
                {name: 'insert table ...', imgClass: 'fa-table'},
                {name: 'draw grids', imgClass: 'fa-th'},
                {name: 'fill color'},
            ]
        },
    ];
};

myMenu.controller('menuController', menu);
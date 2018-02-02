let myAlbum = function () {
    this.albumItems = [
        {
            src: 'img/cats1.jpg',
            title: 'Card title-1',
            description: 'This is a wider card with supporting text below as a natural lead-in to\n' +
            'additional content. This content is a little bit longer.',
            footer: 'card footer',
        },
        {
            src: 'img/cats2.jpg',
            title: 'Card title-2',
            description: 'This is a wider card with supporting text below as a natural lead-in to\n' +
            'additional content. This content is a little bit longer.',
            footer: 'card footer',
        },
        {
            src: 'img/cats3.jpg',
            title: 'Card title-3',
            description: 'This is a wider card with supporting text below as a natural lead-in to\n' +
            'additional content. This content is a little bit longer.',
            footer: 'card footer',
        },
        {
            src: 'img/cats4.webp',
            title: 'Card title-4',
            description: 'This is a wider card with supporting text below as a natural lead-in to\n' +
            'additional content. This content is a little bit longer.',
            footer: 'card footer',
        },
        {
            src: 'img/cats5.jpg',
            title: 'Card title-5',
            description: 'This is a wider card with supporting text below as a natural lead-in to\n' +
            'additional content. This content is a little bit longer.',
            footer: 'card footer',
        }
    ]
};
angular.module('myAlbum', [])
    .controller('myAlbum', myAlbum)
    .directive('photoAlbum', function () {
        return {
            link: function (scope, element, attrs) {
                scope.width = attrs.width;
                scope.height = attrs.height;
                scope.corners = attrs.corners;
                scope.inRow = attrs.inRow;
                scope.padding = attrs.padding;
            },
            templateUrl: 'tpl/album.tpl'
        };
    });